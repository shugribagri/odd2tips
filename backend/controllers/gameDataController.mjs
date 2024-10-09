import GameData from "../models/GameDataRooms.mjs";
import { formatDate } from "../utils/dateUtils.mjs";
import mongoose from "mongoose";

const createGameData = async (req, res) => {
  try {
    const { roomId, ...rest } = req.body;
    console.log("req.body", req.body);

    const newGameData = new GameData({
      roomId: new mongoose.Types.ObjectId(roomId),
      ...rest,
    });
    const savedGameData = await newGameData.save();
    res.status(201).json(savedGameData);
  } catch (error) {
    console.error("Error creating game data:", error);
    res.status(500).json({ message: "Failed to create game data" });
  }
};

const editGameData = async (req, res) => {
  const { id: gameId } = req.params;

  try {
    const gameData = await GameData.findByIdAndUpdate(gameId, req.body, {
      new: true,
    });

    if (!gameData) {
      return res.status(404).json({ message: "GameData not found" });
    }

    res.json(gameData);
  } catch (error) {
    console.error("Error updating game data:", error);
    res.status(500).json({ message: "Failed to update game data" });
  }
};

const deleteGameData = async (req, res) => {
  const { id: gameId } = req.params;

  try {
    const gameData = await GameData.findByIdAndDelete(gameId);

    if (!gameData) {
      return res.status(404).json({ message: "GameData not found" });
    }

    res.json({ message: "GameData deleted successfully" });
  } catch (error) {
    console.error("Error deleting game data:", error);
    res.status(500).json({ message: "Failed to delete game data" });
  }
};

export { createGameData, editGameData, deleteGameData };
