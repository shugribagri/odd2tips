import express from "express";
import {
  createRoom,
  updateRoomMembers,
  getAllRooms,
  getRandomRoom,
  getRoomByTitle,
  slugifyRooms,
  isFollowing,
} from "../controllers/roomController.mjs";
import authenticate from "../middleware/authenticate.mjs";

const router = express.Router();

router.post("/create", authenticate, createRoom);

router.get("/get", getAllRooms);

router.get("/getRandom", getRandomRoom);

router.get("/get/:title", getRoomByTitle);

router.get("/slugify", slugifyRooms);

router.get("/updateMembers", authenticate, updateRoomMembers);

router.get("/isFollowing", isFollowing);

export default router;
