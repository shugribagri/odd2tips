import mongoose from "mongoose";
import Prediction from "../models/Prediction.mjs";
import GameData from "../models/GameData.mjs";
import { formatDate } from "../utils/dateUtils.mjs";

const getPredictions = async (req, res) => {
  let shuffledPredictions;
  let selectedPredictions;

  let firstRoomPredictions;
  let secondRoomPredictions;
  let thirdRoomPredictions;
  let fourthRoomPredictions;
  let fifthRoomPredictions;
  try {
    const today = new Date();
    const dateString = formatDate(today);

    const predictions = await Prediction.find({
      date: dateString,
      prediction: { $ne: "Draw" },
    });

    if (predictions.length < 10) {
      shuffledPredictions = predictions.sort(() => 0.5 - Math.random());
      selectedPredictions = shuffledPredictions;

      firstRoomPredictions = selectedPredictions.slice(0, 1);
      secondRoomPredictions = selectedPredictions.slice(1, 2);
      thirdRoomPredictions = selectedPredictions.slice(2, 3);
      fourthRoomPredictions = selectedPredictions.slice(3, 4);
      fifthRoomPredictions = selectedPredictions.slice(4, 5);
    } else {
      shuffledPredictions = predictions.sort(() => 0.5 - Math.random());
      selectedPredictions = shuffledPredictions.slice(0, 13);

      firstRoomPredictions = selectedPredictions.slice(0, 2);
      secondRoomPredictions = selectedPredictions.slice(3, 6);
      thirdRoomPredictions = selectedPredictions.slice(7, 8);
      fourthRoomPredictions = selectedPredictions.slice(9, 11);
      fifthRoomPredictions = selectedPredictions.slice(12, 13);
    }

    const firstRoomId = new mongoose.Types.ObjectId("6618dbf5ad0eed6ed54294b6");
    const secondRoomId = new mongoose.Types.ObjectId(
      "6627e05bef51f7e131a1a290"
    );
    const thirdRoomId = new mongoose.Types.ObjectId("6634d619c25268c539c0455b");
    const fourthRoomId = new mongoose.Types.ObjectId(
      "66374d04c1fc1ffbfedf9f64"
    );
    const fifthRoomId = new mongoose.Types.ObjectId("663b536c43ce48e99acb6ea3");

    const firstRoomEntries = firstRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: firstRoomId,
      date: prediction.date,
    }));

    const secondRoomEntries = secondRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: secondRoomId,
      date: prediction.date,
    }));

    const thirdRoomEntries = thirdRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: thirdRoomId,
      date: prediction.date,
    }));

    const fourthRoomEntries = fourthRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: fourthRoomId,
      date: prediction.date,
    }));

    const fifthRoomEntries = fifthRoomPredictions.map((prediction) => ({
      gameTitle: prediction.competitionName,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      prediction: prediction.prediction,
      last5home: prediction.last5home,
      last5away: prediction.last5away,
      homeOdd: prediction.homeOdd,
      drawOdd: prediction.drawOdd,
      awayOdd: prediction.awayOdd,
      countryName: prediction.countryName,
      roomId: fifthRoomId,
      date: prediction.date,
    }));

    await GameData.insertMany(
      firstRoomEntries
        .concat(secondRoomEntries)
        .concat(thirdRoomEntries)
        .concat(fourthRoomEntries)
        .concat(fifthRoomEntries)
    );

    console.log("GameData entries successfully created for all rooms.");
    res.status(200).json({ message: "Predictions allocated to rooms." });
  } catch (error) {
    console.error("Failed to allocate predictions to rooms:", error);
  }
};

export { getPredictions };
