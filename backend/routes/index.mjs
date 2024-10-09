import twitterTrendsRoutes from "./scraping/twitterTrendsRoutes.mjs";
import betHistoryRoutes from "../routes/history/historyRoutes.mjs";
import xroutes from "./twitter/xroutes.mjs";
import tipsterEmails from "./tipsterCompRoutes.mjs";
import ShortenedLink from "./ShortenedLinks/shortenedLinksRoutes.mjs";

const routes = (app) => {
  app.use("/api/scrapedData", twitterTrendsRoutes);
  app.use("/api/history", betHistoryRoutes);
  app.use("/api/twitter", xroutes);
  app.use("/api/tipsterEmail", tipsterEmails);
  app.use("/api/shortenedLinks", ShortenedLink);
};

export default routes;
