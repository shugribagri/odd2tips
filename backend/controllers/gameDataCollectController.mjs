import GameDataRooms from "../models/GameDataRooms.mjs";
import GameData from "../models/GameData.mjs";
import Room from "../models/Room.mjs";
import { formatDate } from "../utils/dateUtils.mjs";

const getGameData = async (req, res) => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, 10);

  console.log("todayDateString", todayDateString);

  const { roomId } = req.query;

  try {
    const gameData = await GameDataRooms.find({
      date: {
        $regex: `^${todayDateString}`,
      },
      roomId: roomId,
    });

    if (!gameData.length) {
      return res.status(404).json({ message: "No game data found for today." });
    }

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};

// modified to fetch today games
const getRandomGameData = async (req, res) => {
  const today = new Date();
  const todayFormatted = formatDate(today);

  try {
    // const randomGameData = await GameData.find({ date: todayFormatted });
    const randomGameData = await GameData.aggregate([
      { $match: { date: todayFormatted } },
      { $sample: { size: 3 } },
    ]);

    if (!randomGameData.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(randomGameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
};

const getRandomGameforTweets = async (req, res) => {
  try {
    const today = new Date();
    const todayFormatted = formatDate(today);
    const games = await GameData.find({ date: todayFormatted });

    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];

    if (randomGame) {
      res.status(200).json(randomGame);
    } else {
      res.status(404).json({ message: "No games found in the database" });
    }
  } catch (error) {
    console.error("Error fetching random game from database:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getGameData, getRandomGameData, getRandomGameforTweets };
