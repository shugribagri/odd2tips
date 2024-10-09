"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import { GameData } from "../../interfaces/gameData";
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
      switch (game.prediction) {
        case "Home win":
          if (parseFloat(game.homeOdd) !== 0) {
            newTotalOdds *= parseFloat(game.homeOdd);
          }
          break;
        case "Away win":
          if (parseFloat(game.awayOdd) !== 0) {
            newTotalOdds *= parseFloat(game.awayOdd);
          }
          break;
        case "Draw":
          if (parseFloat(game.drawOdd) !== 0) {
            newTotalOdds *= parseFloat(game.drawOdd);
          }
          break;
        default:
          break;
      }
    });
    setTotalOdds(newTotalOdds);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow rounded overflow-hidden">
        {games.length === 0 ? (
          <div className="p-6 text-center text-lg font-medium text-gray-500">
            No games available. Please check back later.
          </div>
        ) : (
          <>
            {games.map((game) => (
              <div
                ref={ref}
                key={game._id}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-purple-600">
                  {game.gameTitle}
                </h3>
                <p className="text-gray-500">{game.date}</p>
                <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold text-teal-700">
                      {game.homeTeam}
                    </h4>
                    <div className="flex justify-center">
                      {game.last5home.map((result, index) => (
                        <span
                          key={index}
                          className={`result ${
                            result === "W"
                              ? "bg-green-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          } rounded-md text-white px-2 py-1 mx-1`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <p className="text-gray-500">
                      Prediction: {game.prediction}
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold text-teal-700">
                      {game.awayTeam}
                    </h4>
                    <div className="flex justify-center">
                      {game.last5away.map((result, index) => (
                        <span
                          key={index}
                          className={`result ${
                            result === "W"
                              ? "bg-green-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          } rounded-md text-white px-2 py-1 mx-1`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${getStatusStyle(game.status)}`}>
                  {game.status}
                </p>
                <div className="text-right">
                  <p className="text-green-600">Home: {game.homeOdd}</p>
                  <p className="text-blue-600">Draw: {game.drawOdd}</p>
                  <p className="text-red-600">Away: {game.awayOdd}</p>
                </div>
              </div>
            ))}
            <div className="p-4 text-center text-lg">
              Total Odds: {totalOdds.toFixed(2)}
            </div>
          </>
        )}
      </div>
      {/*<button
        onClick={downloadImage}
        className="mt-4 mr-4 px-6 py-3 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-teal-700"
      >
        Download as PNG
                        </button>*/}
    </>
  );
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Home win":
      return "text-green-500";
    case "Away win":
      return "text-red-500";
    case "Draw":
      return "text-blue-500";
    default:
      return "text-gray-400";
  }
}

export default Daily2Odds;
