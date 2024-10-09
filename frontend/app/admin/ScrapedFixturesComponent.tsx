"use client";

import React, { useState, useEffect } from "react";
import { fetchScrapedFixtures } from "../utils/football";
import Loading from "../Components/Loading";

const ScrapedFixtures: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFixtures = async () => {
    setLoading(true);
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/scrapedData/fixtures";
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    } finally {
      setLoading(false);
      alert("Fixtures fetched successfully");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchFixtures}>scrap FIxtures</button>
    </div>
  );
};

export default ScrapedFixtures;
