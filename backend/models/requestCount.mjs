import e from "express";
import mongoose from "mongoose";

const requestCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 1,
  },
  ipAddress: String,
  userAgent: String,
  language: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const RequestCount = mongoose.model("RequestCount", requestCountSchema);

export default RequestCount;
