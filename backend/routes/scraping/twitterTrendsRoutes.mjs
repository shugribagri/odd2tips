import express from "express";
import {
  scrapeTrends24,
  scrapeTrends24Test,
} from "../../controllers/scraping/twitterTrendsController.mjs";

const router = express.Router();

router.get("/trends254", scrapeTrends24);
router.get("/trends24test", scrapeTrends24Test);

export default router;
