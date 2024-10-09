import express from "express";
import {
  createHistory,
  getHistory,
} from "../controllers/historyController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";

const router = express.Router();

router.get("/create-history", createHistory);
router.get("/get-history", getHistory);

export default router;
