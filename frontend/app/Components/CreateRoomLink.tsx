"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CreateRoomLink: React.FC = () => {
  let router = useRouter();

  const navigateToCreateRoom = () => {
    router.push("/rooms/create");
  };

  return (
    <button
      className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
      onClick={navigateToCreateRoom}
    >
      Become a Tipster
    </button>
  );
};

export default CreateRoomLink;
