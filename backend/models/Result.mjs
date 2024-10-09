import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  date: { type: String, required: true },
  league: { type: String, required: true },
  teamOne: {
    name: { type: String, required: true },
    score: { type: String, required: true },
  },
  teamTwo: {
    name: { type: String, required: true },
    score: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Result", resultSchema);
