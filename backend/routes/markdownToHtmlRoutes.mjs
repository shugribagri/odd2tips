import express from "express";
import markdownToHtml from "../controllers/markdownToHtmlController.mjs";

const router = express.Router();

router.post("/convert", markdownToHtml);

export default router;
