import express from "express";
import checkAuthController from "../controllers/checkAuthController.mjs";

const router = express.Router();

router.get("/checkAuth", checkAuthController.checkAuth);

export default router;
