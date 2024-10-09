"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import axios from "axios";
import { YouTubeEmbed } from "@next/third-parties/google";

const Announcements: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("/api/tipsterEmail/create", { name, email });

      setMessage(
        "Successfully registered! Check your email for further instructions."
      );
    } catch (error) {
      setMessage("Failed to register. Please try again.");
    }
  };

  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-Inter">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-600">
          <YouTubeEmbed
            videoid="BwQnZrroAM0"
            height={400}
            params="controls=0"
          />
          <h1 className=" w-full text-center text-md md:text-lg animate-bounce text-teal-800 pt-4">
            🎉🔥 Get Ready to Win Big! Join the Weekly Top Tipster Challenge and
            Bag Cash Prizes Every Week! 🔥🎉
          </h1>
          <p className="mb-4 text-xl font-bold text-blue-500 font-mono">
            Welcome to the ultimate community for football enthusiasts and
            tipsters! We are thrilled to announce our Weekly Top Tipster
            competition, where the sharpest minds in football betting come
            together for a chance to win cash prizes every week! 🏆💰
          </p>
          <p className="mb-4">
            Here&apos;s how it works: Each day, tipsters submit their football
            odds of between 1.95 and 2.5. If you&apos;re confident, you can even
            go above 2.5! However, odds below 1.95 won&apos;t be accepted. This
            is a fair and exciting way to showcase your expertise and claim the
            title of Top Tipster. 📊⚽
          </p>
          <p className="mb-4">
            Transparency is our cornerstone. Every registered tipster&apos;s
            history is available in our dedicated history section, ensuring fair
            play and a level playing field for all. Whether you&apos;re a
            seasoned pro or a passionate newcomer, this competition is open to
            everyone.
          </p>
          <p className="mb-4">
            The first round kicks off from June 21, 2024, to June 28, 2024.
            Ready to get started? Simply provide us with your email, and
            we&apos;ll send you all the details you need to join the fun and
            start winning!
          </p>
          <p className="mb-4 text-xl font-bold text-green-500">
            Join us and become part of a vibrant, supportive community where
            your skills can shine. Let the games begin! 🌟
          </p>
          <p className="mb-4 text-xl font-bold text-red-500">
            Send us your details now to claim your place and get started on your
            journey to victory 🏆🔥
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
            {message && (
              <p className="mt-2 text-center text-sm text-red-600">{message}</p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Announcements;
