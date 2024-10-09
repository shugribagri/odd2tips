"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { formatDate } from "../utils/dateUtils";

// Define the GameData interface
interface GameData {
  _id: string;
  gameTitle: string;
  predictionType: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odd: number;
  roomId: string;
}

const EditGames: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [editedGame, setEditedGame] = useState<GameData | null>(null);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/gameDataCollectAllDates?roomId=${roomId}`
        );
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, [roomId]);

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    game: GameData
  ) => {
    e.stopPropagation();
    setEditModeId(game._id);
    setEditedGame({ ...game });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof GameData
  ) => {
    if (editedGame) {
      setEditedGame({ ...editedGame, [field]: e.target.value });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent, gameId: string) => {
    e.preventDefault();
    if (editedGame) {
      try {
        const response = await axios.put(
          `/api/games/gameData/${gameId}`,
          editedGame
        );

        setGames(
          games.map((game) => (game._id === gameId ? response.data : game))
        );
        setEditModeId(null);
        setEditedGame(null);
      } catch (error) {
        console.error("Failed to update game:", error);
      }
    }
  };

  const handleDelete = async (gameId: string) => {
    try {
      const res = await axios.delete(`/api/games/gameData/${gameId}`);
      alert(res.data.message);

      setGames(games.filter((game) => game._id !== gameId));
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-200 to-slate-500 p-4 shadow-lg">
      <h1 className="text-xl font-bold text-center text-white mb-2">
        EDIT GAMES
      </h1>
      {games.map((game) => (
        <form key={game._id} className="p-2 mb-2 bg-purple-700 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-xs text-white">
              {editModeId === game._id ? (
                <>
                  <input
                    type="text"
                    value={editedGame?.gameTitle}
                    onChange={(e) => handleEditChange(e, "gameTitle")}
                    className="bg-white text-black p-2"
                  />
                  <input
                    type="datetime-local"
                    value={editedGame?.startTime}
                    onChange={(e) => handleEditChange(e, "startTime")}
                    className="bg-white text-black p-2"
                  />
                  <input
                    type="text"
                    value={editedGame?.homeTeam}
                    onChange={(e) => handleEditChange(e, "homeTeam")}
                    className="bg-white text-black p-2"
                  />
                  <input
                    type="text"
                    value={editedGame?.awayTeam}
                    onChange={(e) => handleEditChange(e, "awayTeam")}
                    className="bg-white text-black p-2"
                  />
                  <input
                    type="text"
                    value={editedGame?.prediction}
                    onChange={(e) => handleEditChange(e, "prediction")}
                    className="bg-white text-black p-2"
                  />
                  <input
                    type="number"
                    value={editedGame?.odd}
                    onChange={(e) => handleEditChange(e, "odd")}
                    className="bg-white text-black p-2"
                  />
                </>
              ) : (
                <>
                  <div>{formatDate(new Date(game.startTime))}</div>
                  <div>{game.gameTitle}</div>
                  <div>
                    {game.homeTeam} vs {game.awayTeam}
                  </div>
                  <div>{`${game.prediction} @ ${game.odd}`}</div>
                </>
              )}
            </div>
            <div>
              {editModeId === game._id ? (
                <>
                  <button
                    onClick={(e) => handleEditSubmit(e, game._id)}
                    type="button"
                    className="p-2 text-white hover:text-green-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditModeId(null)}
                    className="p-2 text-white hover:text-red-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => handleEditClick(e, game)}
                    className="p-2 text-white hover:text-green-500"
                  >
                    <MdModeEdit size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(game._id)}
                    className="p-2 text-white hover:text-red-500"
                  >
                    <MdDelete size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default EditGames;
