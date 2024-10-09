import express from "express";
import { createTipsterEntry } from "../controllers/tipsterCompController.mjs";

const router = express.Router();

router.post("/create", createTipsterEntry);

export default router;
