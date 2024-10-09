import express from "express";
import {
  createGameData,
  editGameData,
  deleteGameData,
} from "../controllers/gameDataController.mjs";

const router = express.Router();

router.post("/gameData", createGameData);
router.put("/gameData/:id", editGameData);
router.delete("/gameData/:id", deleteGameData);

export default router;
