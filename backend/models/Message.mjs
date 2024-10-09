import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    userProfilePicture: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
