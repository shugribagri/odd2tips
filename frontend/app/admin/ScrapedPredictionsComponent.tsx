"use client";

import React, { useState, useEffect } from "react";
import { fetchScrapedPredictions } from "../utils/football";
import Loading from "../Components/Loading";

const ScrapePredictions = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/scrapedData/predictions";
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
      alert("Predictions fetched successfully");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchPredictions}>scrap Predictions</button>
    </div>
  );
};

export default ScrapePredictions;
