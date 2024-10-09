import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: String[("WON", "LOST", "Pending", "UNAVAILABLE")],
      required: true,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
