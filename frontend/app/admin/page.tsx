import React from "react";
import ScrapedFixtures from "./ScrapedFixturesComponent";
import ScrapedResults from "./ScrapedResultsComponent";
import ScrapePredictions from "./ScrapedPredictionsComponent";
import CreateHistory from "./CreateHistory";
import StorePredictzResults from "./StorePredictzResults";
import AnalyzeResults from "./AnalyzeResults";
import AllocateFixtures from "./AllocateFixtures";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import GameList from "./GameList";
import GameDataCollectAllGameData from "./gameDataCollectAllGameData";

const AdminPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main className=" mx-auto container flex flex-col gap-8 py-8 bg-[whitesmoke] text-green-800">
        <h1 className="font-bold text-lg md:text-xl">Admin Page</h1>
        <ScrapedFixtures />
        <ScrapedResults />
        <ScrapePredictions />
        <AllocateFixtures />
        <CreateHistory />
        <StorePredictzResults />
        <AnalyzeResults />
        <GameList />
        <GameDataCollectAllGameData />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
