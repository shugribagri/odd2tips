import express from "express";
import { getMessages } from "../controllers/chatController.mjs";

const router = express.Router();

router.get("/messages", getMessages);

export default router;
