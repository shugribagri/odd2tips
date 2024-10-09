import { Router } from "express";
import appRoutes from "../controllers/appController.mjs";

const router = Router();

router.get("/status", appRoutes.getStatus);

export default router;
