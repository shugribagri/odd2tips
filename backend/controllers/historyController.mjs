import History from "../models/History.mjs";
import Room from "../models/Room.mjs";
import GameData from "../models/GameData.mjs";
import { formatDate } from "../utils/dateUtils.mjs";

const createHistory = async (req, res) => {
  try {
    const rooms = await Room.find();

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return formatDate(date);
    });

    const today = formatDate(new Date());

    for (const room of rooms) {
      for (const date of last7Days) {
        await History.deleteMany({ date, roomId: room._id });

        const games = await GameData.find({ roomId: room._id, date: date });

        if (games.length === 0) {
          await History.create({
            date,
            roomId: room._id,
            status: "UNAVAILABLE",
          });
          console.log("No games found for room:", room.title, "on date:", date);
          continue;
        }

        if (date === today) {
          await History.create({ date, roomId: room._id, status: "Pending" });
          console.log(
            "Status for room:",
            room.title,
            "on date:",
            date,
            "is Pending"
          );
          continue;
        }

        const hasPendingGames = games.some((game) => game.status === "Pending");
        if (hasPendingGames) {
          await History.create({ date, roomId: room._id, status: "Pending" });
          console.log(
            "Pending games found for room:",
            room.title,
            "on date:",
            date
          );
          continue;
        }

        const isAllWon = games.every(
          (game) => game.status === game.prediction && game.status !== "Pending"
        );
        const status = isAllWon ? "WON" : "LOST";
        await History.create({ date, roomId: room._id, status });
        console.log(
          "Status for room:",
          room.title,
          "on date:",
          date,
          "is",
          status
        );
      }
    }

    console.log("History created successfully");
    res.status(200).json({ message: "History created successfully" });
  } catch (error) {
    console.error("Error creating history:", error);
    res
      .status(500)
      .json({ message: "Failed to create history", error: error.message });
  }
};

const getHistory = async (req, res) => {
  const { roomId } = req.query;

  try {
    const history = await History.find({ roomId });

    res.status(200).json(history);
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

const getTodayHistory = async (req, res) => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = formatDate(yesterday);

  try {
    const history = await History.find({ date });

    if (history.length === 0) {
      res.status(200).json([]);
      return;
    }

    let roomTitles = [];
    for (const record of history) {
      if (record.status === "WON") {
        const room = await Room.findById(record.roomId);
        roomTitles.push(room.title);
      }
    }
    res.status(200).json(roomTitles);
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

export { createHistory, getHistory, getTodayHistory };
