import mongoose from "mongoose";
import bcrypt from "bcrypt";
import e from "express";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    name: { type: String, required: true },
    profilePicture: { type: String, required: false },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isRoomAdmin: {
      type: Boolean,
      default: false,
    },
    isAppAdmin: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
