import mongoose from "mongoose";

const twitterDBSchema = new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
  fileUrls: [String],
  formattedContent: String,
  excerpt: String,
  slug: String,
  authorName: String,
  authorImagePath: String,
  coverImagePath: String,
  date: { type: Date, default: Date.now },
});

const twitterDB = mongoose.model("twitterDB", twitterDBSchema);

export default twitterDB;
