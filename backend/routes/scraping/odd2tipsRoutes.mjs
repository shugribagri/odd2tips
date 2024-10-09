import { odd2tipsController } from "../../controllers/scraping/odd2tipsController.mjs";
import express from "express";
const router = express.Router();

router.get("/odd2tips", odd2tipsController);

export default router;
