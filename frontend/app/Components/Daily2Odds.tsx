"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import { GameData } from "../../interfaces/gameDataLS";
import * as htmlToImage from "html-to-image";
import { format } from "date-fns";

interface Daily2OddsProps {
  roomId: string | null;
  roomTitle: string | null;
  adminId: string | null;
}

const Daily2Odds: React.FC<Daily2OddsProps> = ({
  roomId,
  roomTitle,
  adminId,
}) => {
  const [games, setGames] = useState<GameData[]>([]);
  const [totalOdds, setTotalOdds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/gameDataCollect?roomId=${roomId}`
        );
        setGames(data);
        calculateTotalOdds(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchGames();
    }
  }, [roomId]);

  const downloadImage = async () => {
    try {
      const node = ref.current;

      if (node) {
        const dataUrl = await htmlToImage.toPng(node);
        const currentTimestamp = format(new Date(), "yyyy MM dd_HH:mm:ss");
        const link = document.createElement("a");
        link.download = `odd2tips.com.${currentTimestamp}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const calculateTotalOdds = (games: GameData[]) => {
    let newTotalOdds = 1;
    games.forEach((game) => {
      newTotalOdds *= game.odd;
    });
    setTotalOdds(newTotalOdds);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div
        ref={ref}
        className="max-w-4xl mx-auto bg-slate-800 shadow rounded overflow-hidden"
      >
        <div className="p-4 bg-teal-950 text-white text-center text-lg font-semibold">
          <h2>{roomTitle}</h2>
        </div>
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
                <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold text-teal-700">
                      {game.homeTeam}
                    </h4>
                  </div>
                  <div className="col-span-1 flex justify-center items-center flex-col">
                    <p className="text-gray-500">
                      Prediction: {game.prediction}
                    </p>

                    <p className="text-green-600">Odd: {game.odd}</p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold text-teal-700">
                      {game.awayTeam}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 text-center text-lg text-[whitesmoke]">
              Total Odds: {totalOdds.toFixed(2)}
            </div>
          </>
        )}
      </div>
      <button
        onClick={downloadImage}
        className="mt-4 mr-4 px-6 py-3 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-teal-700"
      >
        Download as PNG
      </button>
    </>
  );
};

export default Daily2Odds;
