import React from "react";
import { fetchResults } from "../../utils/football";

interface TeamInfo {
  name: string;
  score: number;
}

const MatchResults: React.FC = async () => {
  const results = await fetchResults();

  return (
    <div className="bg-white shadow rounded-lg p-4 mx-auto my-6 max-w-4xl">
      {results.map((result, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="text-lg font-bold mb-2 text-[#5e17eb]">
            {result.league}
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md mb-2 shadow">
            <span className="font-medium text-slate-800">
              {result.teamOne.name}
            </span>
            <span className="text-sm bg-green-600 px-2 py-1 rounded text-white">
              {result.teamOne.score}
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md shadow">
            <span className="font-medium text-slate-800">
              {result.teamTwo.name}
            </span>
            <span className="text-sm bg-green-600 px-2 py-1 rounded text-white">
              {result.teamTwo.score}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
