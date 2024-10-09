"use client";

import React, { useState } from "react";
import Loading from "../Components/Loading";
import { allocateFixturesToRooms } from "../utils/football";

const AllocateFixtures: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const allocateFixtures = async () => {
    setLoading(true);
    try {
      window.location.href =
        "https://odd2tips.onrender.com/api/football/predictz";
      setSuccess(true);
    } catch (error) {
      console.error("Error allocating fixtures:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <button onClick={allocateFixtures}>
        Allocate Fixtures{" "}
        {success && "Fixtures successfully allocated to Rooms."}
      </button>
    </div>
  );
};

export default AllocateFixtures;
