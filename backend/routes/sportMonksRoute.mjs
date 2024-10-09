import express from "express";
import { getFixtures } from "../controllers/sportMonksController.mjs";

const router = express.Router();

router.get("/fixtures", getFixtures);

export default router;
