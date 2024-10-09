import React from "react";
import { fetchRandomGameData } from "../utils/football";

const RandomGameData: React.FC = async () => {
  const games = (await fetchRandomGameData()) || [];
  console.log(`games`, games);

  return (
    <>
      <div className="w-full md:w-[80vw] px-4  mx-auto bg-slate-800 shadow  overflow-hidden">
        <h2 className="md:text-3xl text-xl font-bold text-center text-teal-600 mt-8 mb-6">
          FREE TIPS TODAY
        </h2>
        <p className="text-center text-slate-600 mb-5">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {games.length === 0 ? (
          <div className="p-6 text-center text-lg font-medium text-teal-500">
            No games available. Please check back later.
          </div>
        ) : (
          <>
            {games.length > 0 &&
              games.map((game) => (
                <div
                  key={game._id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <h3 className="text-xl font-semibold text-purple-600 mb-2">
                    {game.gameTitle}
                  </h3>
                  <p className="text-teal-500 mb-2">{game.date}</p>
                  <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                    <div className="col-span-1 flex flex-col items-center">
                      <h4 className="text-md text-white font-semibold">
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
                      <p className="text-gray-300">
                        Prediction: {game.prediction}
                      </p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                      <h4 className="text-md text-white font-semibold">
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

            {/*<div className="p-4 text-center text-lg font-bold text-teal-500">
            Total Odds: {totalOdds.toFixed(2)}
                        </div>*/}
          </>
        )}
      </div>
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

export default RandomGameData;
