import mongoose from "mongoose";

const gameDataRoomsSchema = new mongoose.Schema(
  {
    gameTitle: { type: String }, // e.g. UEFA Champions League
    predictionType: { type: String }, // e.g. ODD2TIPS, BETKING, etc.
    startTime: { type: Date },
    homeTeam: { type: String },
    awayTeam: { type: String },
    prediction: { type: String },
    odd: { type: Number },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: { type: String, default: "pending" },
    countryName: String,
    date: String,
  },
  { timestamps: true }
);

export default mongoose.model("GameDataRooms", gameDataRoomsSchema);
