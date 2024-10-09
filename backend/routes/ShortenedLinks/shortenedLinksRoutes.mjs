import express from "express";
import {
  createShortenedLink,
  getShortenedLink,
} from "../../controllers/shortenedLinks/shortenedLInksController.mjs";

const router = express.Router();

router.post("/", createShortenedLink);
router.get("/:shortUrl", getShortenedLink);

export default router;
