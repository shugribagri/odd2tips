import express from "express";
import { getRequestCount } from "../controllers/requestCounterController.mjs";

const router = express.Router();

router.get("/requestCount", getRequestCount);

export default router;
