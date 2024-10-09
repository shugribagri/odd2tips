import GameData from "../models/GameData.mjs";
import GameDataRooms from "../models/GameDataRooms.mjs";

const getGameDataAllDates = async (req, res) => {
  const { roomId } = req.query;

  try {
    const gameData = await GameDataRooms.find({
      roomId: roomId,
    });

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};

const getGameDataAllGameData = async (req, res) => {
  try {
    const gameData = await GameDataRooms.find({}).sort({ createdAt: -1 });

    res.json(gameData);
  } catch (error) {
    console.error("Error getting game data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch game data or log request" });
  }
};

export { getGameDataAllDates, getGameDataAllGameData };
