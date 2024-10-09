import React from "react";
import Navbar from "@/app/Components/Navbar";
import AddBetSlipLS from "@/app/Components/AddBetSlipLS";
import BetSlipDownload from "@/app/Components/BetSlipDownload";
import CreateDownloadBanner from "@/app/Components/CreateDownloadBanner";
import Footer from "@/app/Components/Footer";
import { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Create, Customize & Download BetSlips for free Instantly",
  description:
    "Create & Customize Your Betslips. Download high-quality betslips tailored to your style without registration. Odd2Tips is the best place to create, customize and download betslips for free.",
  keywords: [
    "create betslip",
    "customize betslip",
    "download betslip",
    "betslip",
  ],
};

const CreateRoomPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />

      <CreateDownloadBanner />

      <main className="min-h-screen bg-[whitesmoke] text-teal-500 px-[10%] mx-auto  flex flex-col md:flex-row gap-8">
        <div className="py-10 md:w-1/2 w-full md:flex md:flex-col md:items-center pt-[5%]">
          <BetSlipDownload />
        </div>
        <div className="py-10 md:w-1/2">
          <AddBetSlipLS />
        </div>
        <div className="py-10 bg-teal-600 md:hidden"></div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateRoomPage;
