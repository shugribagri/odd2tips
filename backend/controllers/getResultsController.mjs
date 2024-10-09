import e from "express";
import Result from "../models/Result.mjs";
import moment from "moment";

const getResults = async (req, res) => {
  try {
    const todayDate = moment().format("MMMM YYYY dddd Do MMMM");
    const yesterdayDate = moment()
      .subtract(1, "days")
      .format("MMMM YYYY dddd Do MMMM");

    const results = await Result.find({
      date: { $in: [todayDate, yesterdayDate] },
    }).sort({});

    res.status(200).json(results);
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).send("Server Error: " + error.message);
  }
};

export { getResults };
