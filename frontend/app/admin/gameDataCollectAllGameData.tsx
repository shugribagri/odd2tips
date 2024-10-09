import React from "react";
import { gameDataCollectAllGames } from "../utils/football";
import AdminGameData from "./AdminGameData";
import { GameData } from "@/interfaces/gameDataLS";

const GameDataCollectAllGameData: React.FC = async () => {
  const games: GameData[] = await gameDataCollectAllGames();

  return (
    <>
      <AdminGameData games={games} />
    </>
  );
};

export default GameDataCollectAllGameData;
