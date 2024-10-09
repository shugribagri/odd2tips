import React from "react";
import { fetchFixtures } from "../../utils/football";

const FixturesComponent: React.FC = async () => {
  const fixtures = await fetchFixtures();
  return (
    <div className="bg-[whitesmoke] shadow-lg rounded-lg p-5 mx-auto my-6 max-w-4xl">
      <h1 className="text-center text-3xl font-bold text-[#5e17eb] mb-4">
        Football Fixtures
      </h1>
      <p className="text-center text-slate-600 mb-5">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {fixtures.length > 0 ? (
        <ul className="space-y-4">
          {fixtures.map((fixture) => (
            <li
              key={fixture._id}
              className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-slate-900">
                  {fixture.league}
                </div>
                <span className="text-sm font-medium text-green-600">
                  {fixture.time}
                </span>
              </div>
              <div className="mt-2 text-center text-xl font-semibold text-[#5e17eb]">
                {fixture.teamOne} vs {fixture.teamTwo}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-slate-500">
          No fixtures available at this time.
        </p>
      )}
    </div>
  );
};

export default FixturesComponent;
