import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../services/tokenService.mjs";
import redisClient from "../utils/redis.mjs";
import User from "../models/User.mjs";

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URL;

// Initiates the Google Login flow
router.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      // User doesn't exist, create new user
      user = new User({
        email: profile.email,

        name: profile.name,
        profilePicture: profile.picture,
        isVerified: true, // Set to true since Google has verified this user
      });
      await user.save();
    }
    const sessionId = uuidv4();
    const token = generateToken({
      userId: user._id.toString(),
      sessionId,
    });

    const oneTimeToken = uuidv4();
    await redisClient.set(
      oneTimeToken,
      JSON.stringify({ token: token, user: user }),
      300
    ); // Expires in 5 minutes

    res.redirect(`https://www.odd2tips.com/login?ott=${oneTimeToken}`);
  } catch (error) {
    console.error("Error:", error.response.data.error);
    res.render("error", { error: "Login error" });
  }
});

export default router;
