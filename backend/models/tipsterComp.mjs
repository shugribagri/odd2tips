import mongoose from "mongoose";

const tipsterCompSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const TipsterComp = mongoose.model("TipsterComp", tipsterCompSchema);

export default TipsterComp;
