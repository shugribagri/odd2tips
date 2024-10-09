import express from "express";
import { XDataUpload } from "../../controllers/twitter/xcontroller.mjs";

const router = express.Router();

router.post("/xdata", XDataUpload);

export default router;
