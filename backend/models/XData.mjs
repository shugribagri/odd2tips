import mongoose from "mongoose";

const XDataSchema = new mongoose.Schema({
  markdown: String || null,

  fileUrls: [String] || null,

  date: { type: Date, default: Date.now },
});

const XData = mongoose.model("XData", XDataSchema);

export default XData;
