import express from "express";
import {
  getYesterdayHistory,
  updateHistory,
} from "../../controllers/history/historyController.mjs";

const router = express.Router();

router.get("/get-yesterday-history", getYesterdayHistory);
router.get("/update-history", updateHistory);

export default router;
