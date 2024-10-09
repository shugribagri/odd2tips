"use client";

import React, { useState } from "react";
import Loading from "../Components/Loading";
import { fetchPredictzResults } from "../utils/football";

const StorePredictzResults: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/football/results-predictz";
      setSuccess(true);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchResults}>
        Store Predictz Results for Analysis {success && "- successfully stored"}
      </button>
    </div>
  );
};

export default StorePredictzResults;
