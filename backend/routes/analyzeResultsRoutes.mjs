import express from "express";
import { analyzeResults } from "../controllers/analyzeResultsController.mjs";
import isAppAdmin from "../middleware/authenticate.mjs";

const router = express.Router();

router.get("/analyze-results", analyzeResults);

export default router;
