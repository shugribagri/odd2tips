import express from "express";
import { getFootballFixtures } from "../controllers/getFootballFixturesController.mjs";

const router = express.Router();

router.get("/fixtures", getFootballFixtures);

export default router;
