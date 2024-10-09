import React from "react";

const BetSlipPromotion: React.FC = () => {
  return (
    <section className="bg-teal-600   md:h-[50vh] w-full md:w-[80vw] px-2 py-4 mx-auto text-white  shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Create and Download Betslips Instantly!
        </h2>
        <p className="mb-6 max-w-4xl">
          Easily generate your betslips with our intuitive interface and
          download them in just a click. Get started now to streamline your
          betting process.
        </p>
        <a
          href="/betslip"
          className="bg-white text-teal-600 font-bold py-2 px-4 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default BetSlipPromotion;
