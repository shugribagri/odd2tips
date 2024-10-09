import React from "react";

const RoomsPromotion: React.FC = () => {
  return (
    <section className="bg-teal-600   h-full w-full  px-2 py-4 mx-auto text-white  shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Create a Room and Share your Predictions
        </h2>
        <p className="mb-6 max-w-4xl">
          Add, edit and delete games, share your predictions with friends and
          get feedback on your predictions.
        </p>
        <a
          href="/rooms/create"
          className="bg-white text-teal-600 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default RoomsPromotion;
