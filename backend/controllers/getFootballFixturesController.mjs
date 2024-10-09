import e from "express";
import Fixtures from "../models/Fixtures.mjs";

const getFootballFixtures = async (req, res) => {
  try {
    const fixtures = await Fixtures.find().lean();

    res.status(200).json(fixtures);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch fixtures: " + err.message,
    });
  }
};

export { getFootballFixtures };
