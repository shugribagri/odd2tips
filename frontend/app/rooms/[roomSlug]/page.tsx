"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Daily2Odds from "@/app/Components/Daily2Odds";
import Chat from "@/app/Components/Chat";
import RoomTitleComponent from "./RoomTitle";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import History from "./History";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";
import { FaLock } from "react-icons/fa";
import { Metadata } from "next";
import Script from "next/script";
export const dynamicParams = true;

{
  /*export const metadata: Metadata = {
  title: "Top Football Predictions Analysis & Betslips | BetRoom",
  description:
    "Get the best football predictions and analysis from our expert tipsters. Download betslips instantly and engage with other football enthusiasts.",
  keywords: [
    "football predictions, football analysis, football betslips, expert tips, football enthusiasts, football fans",
  ],
};*/
}

const RoomComponent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { roomSlug } = useParams();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const adminId = searchParams.get("adminId");
  const roomTitle = searchParams.get("roomTitle");

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal) {
      setActiveModal(modal);
    }
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/auth/checkAuth", {
          withCredentials: true,
        });
        let currentUserId;
        if (response.data.user._id) {
          currentUserId = response.data.user._id.toString();
        }
        if (response.data.user.userId) {
          currentUserId = response.data.user.userId;
        }

        setUserId(currentUserId);
        setIsUserAdmin(currentUserId === adminId);
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, [adminId]);

  const handleButtonClick = (section: string) => {
    if (section === "Settings") {
      router.push(`/rooms/${roomSlug}/dashboard?roomId=${roomId}`);
    } else {
      setActiveModal(section);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const Modal = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div
      id="open-modal"
      className="md:absolute md:right-0 md:top-0 md:bottom-0 h-full md:w-2/3 bg-[whitesmoke] text-teal-600 font-playfair flex justify-center items-center p-4"
    >
      <div className=" p-4 shadow-lg w-full h-auto ">
        <h2 className="text-xl mb-2 font-semibold">{title}</h2>
        {children}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <main className="flex flex-col md:flex-row h-full bg-[whitesmoke] gap-8 py-8 w-[90vw] md:w-[80vw] mx-auto">
        {/* Navigation Section */}

        <div className="w-full md:w-2/3 mx-auto p-4 bg-gray-50 overflow-y-auto">
          <RoomTitleComponent
            roomTitle={roomTitle || "Room"}
            userId={userId}
            roomId={roomId || ""}
          />
          <section
            id="todays-tip"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              Today&apos;s Tip
            </h2>
            <Daily2Odds
              roomId={roomId}
              roomTitle={roomTitle}
              adminId={adminId}
            />
          </section>
          <section
            id="history"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-3">History</h2>
            <History roomId={roomId} />
          </section>

          <section
            id="settings"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-[#5e17eb] mb-3">Settings</h2>
            <button
              onClick={() => isUserAdmin && handleButtonClick("Settings")}
              className={`px-4 py-2 bg-[#5e17eb] text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                !isUserAdmin ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUserAdmin ? "Configure" : <FaLock />}
            </button>
          </section>
        </div>

        {/* Content/Modal Section */}
        {activeModal === "TodaysTip" && (
          <Modal title="Today's Tip">
            <Daily2Odds
              roomId={roomId}
              roomTitle={roomTitle}
              adminId={adminId}
            />
          </Modal>
        )}
        {activeModal === "history" && (
          <Modal title="history">
            <History roomId={roomId} />
          </Modal>
        )}
        <Chat />
      </main>

      <Footer />
      <Script
        type="text/javascript"
        async
        src="//pl23425064.highrevenuenetwork.com/eb/5c/12/eb5c12854223758b1c37d433598047c3.js"
      />
      <Script
        type="text/javascript"
        async
        src="//pl23430474.highrevenuenetwork.com/d4/db/06/d4db06bc86d5410193a1ac45bef7482a.js"
      />
    </div>
  );
};

export default RoomComponent;
