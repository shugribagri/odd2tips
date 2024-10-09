import React from "react";

const investmentsPlay = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Investment Plays
        </h2>
        <div className="flex flex-wrap -mx-4 text-center">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Rookie Rally</h3>
              <p className="mb-6 text-gray-400">
                Kickstart your investment with our entry-level plan, perfect for
                newcomers to the investment game.
              </p>
              <div className="text-4xl font-bold mb-4">$100</div>
              <button
                onClick={() => alert("Coming soon!")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Choose Plan
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Pro Punter</h3>
              <p className="mb-6 text-gray-400">
                For those with experience who aim for consistent growth and
                solid performance.
              </p>
              <div className="text-4xl font-bold mb-4">$500</div>
              <button
                onClick={() => alert("Coming soon!")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Choose Plan
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Elite Endgame</h3>
              <p className="mb-6 text-gray-400">
                The ultimate investment strategy for high-stake players who
                demand the best returns.
              </p>
              <div className="text-4xl font-bold mb-4">$1,000</div>
              <button
                onClick={() => alert("Coming soon!")}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default investmentsPlay;
