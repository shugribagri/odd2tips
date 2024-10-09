import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const About: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <div className="md:min-h-[75vh] h-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-600 md:text-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-teal-500 text-center">
            About Us
          </h1>
          <p className="mb-4">
            At <strong>Odd2Tips</strong>, we pride ourselves on delivering the
            most timely and comprehensive football news, covering the top 5
            leagues in the world and beyond. Our platform stands out with its
            continuous updates, ensuring that our users are always informed with
            the latest and most relevant information.
          </p>
          <p className="mb-4">
            We stand out as a versatile platform tailored for both seasoned
            tipsters and betting enthusiasts. At the heart of our community are
            the <strong>Tipster Rooms</strong>, where five expert tipsters offer
            daily predictions. These rooms are designed to foster connections
            between tipsters and their audience, enabling vibrant community
            interaction and effective marketing of betting insights.
          </p>
          <p className="mb-4">
            One of our key features is the ability for users to create,
            customize, and download betslips without the need for registration.
            Visitors can easily use our tool to compile a list of predictions,
            modify the appearance of their betslip (including colors), and then
            download and share their predictions. This feature makes the betting
            process seamless and user-friendly, catering to both casual visitors
            and dedicated betting fans.
          </p>
          <p className="mb-4">
            In addition to these features, Odd2Tips enriches the betting
            experience by incorporating the latest football news, ensuring users
            are well-informed about developments in the world of football. Our
            platform is dedicated to providing a comprehensive and enjoyable
            experience for all users, from casual fans to serious bettors.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
