"use client";

import React, { useState } from "react";
import { GameData } from "@/interfaces/gameDataLS";
import axios from "axios";

const AdminGameData = ({ games }: { games: GameData[] }) => {
  const [gameStatus, setGameStatus] = useState(
    games.reduce((acc, game) => {
      acc[game._id] = game.status;
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleStatusChange = async (gameId: string, newStatus: string) => {
    try {
      const response = await axios.put(`/api/games/gameData/${gameId}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setGameStatus((prevStatus) => ({
          ...prevStatus,
          [gameId]: newStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating game status:", error);
    }
  };

  return (
    <div>
      <div className="w-[90vw] md:w-[80vw] mx-auto bg-white shadow rounded overflow-hidden">
        {games.length === 0 ? (
          <div className="p-6 text-center text-lg font-medium text-gray-500">
            No games available. Please check back later.
          </div>
        ) : (
          <>
            {games.map((game) => (
              <div
                key={game._id}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-purple-600">
                  {game.gameTitle}
                </h3>
                <p className="text-gray-500">{game.startTime}</p>
                <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold">{game.homeTeam}</h4>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center gap-4">
                    <p className="text-gray-500">
                      Prediction:{" "}
                      <span className="font-bold">{game.prediction}</span>
                    </p>
                    <p className="text-gray-500">
                      Status:{" "}
                      <select
                        value={gameStatus[game._id]}
                        onChange={(e) =>
                          handleStatusChange(game._id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="WIN">WIN</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold">{game.awayTeam}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600">ODD: {game.odd}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminGameData;
