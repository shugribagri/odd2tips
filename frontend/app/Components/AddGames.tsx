"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { set } from "date-fns";

interface GameData {
  gameTitle: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  roomId: string | null;
  date?: string;
  odd: string[];
  countryName: string;
}

const AddGames: React.FC = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState<GameData>({
    gameTitle: "",
    homeTeam: "",
    awayTeam: "",
    prediction: "",
    roomId: "",
    date: "",
    odd: [],
    countryName: "",
  });

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const { roomSlug } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const updatedValue = type === "number" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Please enter a valid date and time for the start time.");
      return;
    }

    const date = new Date(formData.date);

    // Format the date to "yyyy-MM-ddThh:mm"
    const formattedDate = date.toISOString().slice(0, 16);

    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );

    setFormData((prevData) => ({
      ...prevData,
      roomId: roomId,
    }));

    const safeRoomId = typeof roomId === "string" ? roomId : "";

    try {
      setFormData((prevData) => ({
        ...prevData,
        roomId: safeRoomId,
      }));

      const response = await axios.post(`/api/games/gameData`, formData);

      alert(`Form submission successful: ${response.data.gameTitle}`);
      router.push(`/rooms/${roomSlug}/dashboard`);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <main className=" mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-5">Add Games</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gameTitle"
          >
            Game Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gameTitle"
            type="text"
            placeholder="Enter game title   e.g. UEFA Champions League"
            name="gameTitle"
            value={formData.gameTitle}
            onChange={handleChange}
          />
        </div>
        {/* Start Time Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startTime"
            type="datetime-local"
            placeholder="Select start time"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Home Team Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="homeTeam"
          >
            Home Team
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="homeTeam"
            type="text"
            placeholder="Enter home team"
            name="homeTeam"
            value={formData.homeTeam}
            onChange={handleChange}
          />
        </div>

        {/* Away Team Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="awayTeam"
          >
            Away Team
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="awayTeam"
            type="text"
            placeholder="Enter away team"
            name="awayTeam"
            value={formData.awayTeam}
            onChange={handleChange}
          />
        </div>

        {/* Prediction Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prediction"
          >
            Prediction
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prediction"
            type="text"
            placeholder="Enter prediction"
            name="prediction"
            value={formData.prediction}
            onChange={handleChange}
          />
        </div>

        {/* Odd Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="odd"
          >
            Odd
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="odd"
            type="number"
            placeholder="Enter odd"
            name="odd"
            min="0.01"
            step="0.01"
            value={formData.odd}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Game Data
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddGames;
