import express from "express";
import {
  addImageUrlsAndSaveToDatabase,
  saveJsonArticles,
} from "../../controllers/generativeAI/generativeAIController.mjs";

const router = express.Router();

// router.get("/format-articles", formatArticles);
router.get("/add-image-urls", addImageUrlsAndSaveToDatabase);
router.get("/save-mongo", saveJsonArticles);

export default router;
