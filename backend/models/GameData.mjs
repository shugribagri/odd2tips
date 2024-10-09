import mongoose from "mongoose";

const gameDataSchema = new mongoose.Schema(
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
    last5home: [String],
    last5away: [String],
    homeOdd: String,
    drawOdd: String,
    awayOdd: String,
    countryName: String,
    date: String,
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

export default mongoose.model("GameData", gameDataSchema);
