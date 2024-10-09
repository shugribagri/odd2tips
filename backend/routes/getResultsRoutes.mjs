import express from "express";
import { getResults } from "../controllers/getResultsController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";
import { fetchPredictzResults } from "../controllers/scrapedDataController.mjs";

const router = express.Router();

router.get("/get-results", getResults);
router.get("/results-predictz", fetchPredictzResults);

export default router;
