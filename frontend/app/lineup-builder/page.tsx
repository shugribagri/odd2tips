"use client";

import React, { useState } from "react";

type PlayerPosition = {
  id: number;
  x: number;
  y: number;
  name: string;
};

const initialPlayers: PlayerPosition[] = [
  { id: 1, x: 50, y: 90, name: "" },
  { id: 2, x: 50, y: 75, name: "" },
  { id: 3, x: 25, y: 70, name: "" },
  { id: 4, x: 75, y: 70, name: "" },
  { id: 5, x: 50, y: 50, name: "" },
  { id: 6, x: 25, y: 50, name: "" },
  { id: 7, x: 75, y: 50, name: "" },
  { id: 8, x: 50, y: 30, name: "" },
  { id: 9, x: 25, y: 30, name: "" },
  { id: 10, x: 75, y: 30, name: "" },
  { id: 11, x: 50, y: 10, name: "" },
];

const LineupBuilder: React.FC = () => {
  const [players, setPlayers] = useState<PlayerPosition[]>(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPosition | null>(
    null
  );
  const [playerName, setPlayerName] = useState<string>("");

  const resetPlayers = () => {
    setPlayers(initialPlayers);
    setSelectedPlayer(null);
    setPlayerName("");
  };

  const handlePlayerClick = (player: PlayerPosition) => {
    setSelectedPlayer(player);
    setPlayerName(player.name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const savePlayerName = () => {
    if (selectedPlayer) {
      setPlayers(
        players.map((player) =>
          player.id === selectedPlayer.id
            ? { ...player, name: playerName }
            : player
        )
      );
      setSelectedPlayer(null);
      setPlayerName("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-5">
      <h1 className="text-2xl mb-5">Lineup Builder</h1>
      <div className="flex flex-col items-center mb-5">
        <button
          onClick={resetPlayers}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white mb-2"
        >
          Reset Lineup
        </button>
      </div>
      <div className="relative w-4/5 max-w-lg h-[80vh] bg-gray-800 border-2 border-gray-700 rounded-md mb-5">
        {players.map((player) => (
          <div
            key={player.id}
            style={{ left: `${player.x}%`, top: `${player.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
            onClick={() => handlePlayerClick(player)}
          >
            {player.name || player.id}
          </div>
        ))}
      </div>
      {selectedPlayer && (
        <div className="flex flex-col items-center mb-5">
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            className="px-4 py-2 mb-2 bg-gray-700 border-2 border-gray-600 rounded text-white"
            placeholder="Enter player name"
          />
          <button
            onClick={savePlayerName}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded text-white"
          >
            Save
          </button>
        </div>
      )}
      <button
        onClick={() => alert("Saved!")}
        className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded text-white"
      >
        Save & Share
      </button>
    </div>
  );
};

export default LineupBuilder;
