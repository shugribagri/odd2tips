import { formatDate } from "../../utils/dateUtils.mjs";
import History from "../../models/History.mjs";
import Room from "../../models/Room.mjs";
import GameData from "../../models/GameData.mjs";
import GameDataRooms from "../../models/GameDataRooms.mjs";

// update History for each room for each day by checking the status of each game for that day.
// if all games are WON, then update the status of the room to WON for that day.
// if any game is LOST, then update the status of the room to LOST for that day.
// if any game is Pending, then update the status of the room to Pending for that day.
// only check for today and yesterday games.
// for today  games -  date;("2024-07-15T19:00"); slice(0, 10) => "2024-07-15"
// for yesterday games minus 1 from today date.

const updateHistory = async (req, res) => {
  const today = new Date();
  const todayDateString = today.toISOString().slice(0, 10);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayDateString = yesterday.toISOString().slice(0, 10);

  try {
    const rooms = await Room.find();

    for (const room of rooms) {
      const { _id: roomId } = room;

      const yesterdayGameData = await GameDataRooms.find({
        date: yesterdayDateString,
        roomId,
      });

      const formattedYesterdayDate = formatDate(yesterday);

      const yesterdayStatus = getRoomStatus(yesterdayGameData);

      if (yesterdayStatus === "LOST") {
        await History.create({
          roomId,
          status: "LOST",
          date: formattedYesterdayDate,
        });
      } else if (yesterdayStatus === "WON") {
        await History.create({
          roomId,
          status: "WON",
          date: formattedYesterdayDate,
        });
      } else {
        await History.create({
          roomId,
          status: "Pending",
          date: formattedYesterdayDate,
        });
      }
    }
    res.status(200).json({ message: "History updated successfully" });
  } catch (error) {
    console.error("Error updating history:", error);
    res.status(500).json({ message: "Failed to update history" });
  }
};

const getRoomStatus = (gameData) => {
  for (const game of gameData) {
    if (game.status === "Pending") {
      return "Pending";
    } else if (game.status === "LOST") {
      return "LOST";
    }
  }

  return "WON";
};

const getYesterdayHistory = async (req, res) => {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = formatDate(yesterday);

  try {
    const history = await History.find({ date });

    if (history.length === 0) {
      res.status(200).json([]);
      return;
    }

    let roomsData = [];
    for (const record of history) {
      if (record.status === "WON") {
        const room = await Room.findById(record.roomId);

        roomsData.push({
          title: room.title,
          roomId: room._id,
          adminId: room.adminId,
          slug: room.slug,
        });
      }
    }

    const message = generateCelebratoryMessage(roomsData);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

const generateCelebratoryMessage = (roomsData) => {
  let message =
    "THE FOLLOWING ROOMS WON YESTERDAY.\n\nLET'S CONGRATULATE ALL THE WINNERS:\n\n";
  roomsData.forEach(({ title, roomId, adminId, slug }) => {
    const url = `https://www.odd2tips.com/rooms/${slug}?roomId=${roomId}`;
    message += `${title} - 🔗 ${url}\n`;
  });
  message += "\n🎈🎉🎊🎈🎉🎊";
  return message;
};

// https://www.odd2tips.com/rooms/league-of-champions-?roomId=663b536c43ce48e99acb6ea3&adminId=661f9e53a8cbd4dee8e6b58a&roomTitle=LEAGUE%20OF%20CHAMPIONS%20%F0%9F%8F%86&roomSlug=league-of-champions-

export { getYesterdayHistory, updateHistory };
