import express from "express";
import {
  register,
  verifyEmail,
  exchangeOTT,
  updateProfile,
  login,
  logout,
} from "../controllers/authController.mjs";
import authenticate from "../middleware/authenticate.mjs";
import upload from "../utils/upload.mjs";

const router = express.Router();

router.post("/register", upload, register);
router.get("/verify-email", verifyEmail);
router.patch("/updateProfile/:userId", authenticate, updateProfile);

router.post("/google/exchange-ott", exchangeOTT);

router.post("/login", login);
router.post("/logout", logout);

export default router;
