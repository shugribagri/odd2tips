import express from "express";
import uploadFile from "../controllers/fileUploaderController.mjs";
import upload from "../utils/upload.mjs";

const router = express.Router();

router.post("/file", upload, uploadFile);

export default router;
