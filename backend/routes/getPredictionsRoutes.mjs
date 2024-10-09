import express from "express";
import { getPredictions } from "../controllers/getPredictionsController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";

const router = express.Router();

router.get("/predictz", getPredictions);

export default router;
