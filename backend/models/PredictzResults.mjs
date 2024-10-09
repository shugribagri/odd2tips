import mongoose from "mongoose";

const predictzResultsSchema = new mongoose.Schema(
  {
    league: String,
    matchUrl: String,
    teamOne: String,
    scoreOne: String,
    teamTwo: String,
    scoreTwo: String,
    status: String,
  },
  { timestamps: true }
);

const PredictzResults = mongoose.model(
  "PredictzResults",
  predictzResultsSchema
);

export default PredictzResults;
