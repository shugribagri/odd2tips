import express from "express";
import { handleFileUpload } from "../controllers/uploadController.mjs";
const router = express.Router();

router.post("/upload", handleFileUpload);

export default router;
