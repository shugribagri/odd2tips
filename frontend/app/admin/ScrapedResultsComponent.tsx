"use client";

import React, { useState, useEffect } from "react";
import { fetchScrapedResults } from "../utils/football";
import Loading from "../Components/Loading";
import { Result } from "../../interfaces/Result";

const ScrapedResults = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/scrapedData/results";
    } catch (error) {
      console.error("Error fetching rsults:", error);
    } finally {
      setLoading(false);
      alert("Results fetched successfully");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchResults}>scrap Results</button>
    </div>
  );
};

export default ScrapedResults;
