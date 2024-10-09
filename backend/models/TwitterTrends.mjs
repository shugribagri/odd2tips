import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const CountryTrendsSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  trends: [TrendSchema],
});

const TwitterTrends = mongoose.model("TwitterTrends", CountryTrendsSchema);

export default TwitterTrends;
