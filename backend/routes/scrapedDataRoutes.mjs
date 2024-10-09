import express from "express";
import {
  fetchFootballFixtures,
  fetchFootballNews,
  fetchFootballResults,
  scrapePredictions,
  scrapeBBCSport,
  scrapeBBCArticles,
  scrapeBBCLiveArticles,
  cleanData,
  scrapeBundesligaArticles,
  scrapeBundesligaFullArticles,
  scrapeLegaSerieA,
  scrapeSERIEAArticles,
} from "../controllers/scrapedDataController.mjs";
import isAppAdmin from "../middleware/isAppAdmin.mjs";

const router = express.Router();

router.get("/results", fetchFootballResults);
router.get("/fixtures", fetchFootballFixtures);
router.get("/news", fetchFootballNews);
router.get("/predictions", scrapePredictions);
router.get("/bbc-sport", scrapeBBCSport);
router.get("/bbc-articles", scrapeBBCArticles);
router.get("/bbc-live-articles", scrapeBBCLiveArticles);
router.get("/clean", cleanData);
router.get("/bundesliga-articles", scrapeBundesligaArticles);
router.get("/bundesliga-full-articles", scrapeBundesligaFullArticles);
router.get("/serieA", scrapeLegaSerieA);
router.get("/serieA-articles", scrapeSERIEAArticles);

export default router;
