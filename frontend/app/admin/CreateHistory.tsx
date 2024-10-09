"use client";

import React, { useState } from "react";
import { createRoomHistory } from "../utils/football";
import Loading from "../Components/Loading";

const CreateHistoryComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  const createHistoryHandler = async () => {
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/football/create-history";

      setSuccess(true);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loading />;
    }
  };
  return (
    <div>
      <button onClick={createHistoryHandler}>
        CreateHistory {success && "- successfully created"}
      </button>
    </div>
  );
};

export default CreateHistoryComponent;
