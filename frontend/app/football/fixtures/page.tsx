import FixturesComponent from "./FixturesComponent";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
export const dynamicParams = true;

export const metadata: Metadata = {
  title:
    "Football Match fixtures | Football results | Expert Football Predictions & Betslips & Football News",
  description:
    "Football fixtures and results from top leagues - English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more. Get the latest trending news in the football world. Stay updated with the latest news, fixtures, football free daily predictions, and results.",
  keywords: [
    "Manchester United, Chelsea, Arsenal, Liverpool, Manchester City, Barcelona, Real Madrid, Juventus, PSG, Bayern Munich, Borussia Dortmund, Atletico Madrid, Inter Milan, AC Milan, Napoli, Lazio, Roma, Sevilla, Valencia, Villarreal, Real Sociedad, Athletic Bilbao, Real Betis, Real Valladolid, Celta Vigo, Eibar, Getafe, Granada, Huesca, Levante, Osasuna, football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today,football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today",
  ],
};

const FixturesPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <main mx-auto>
        <div className="md:w-2/3">
          <FixturesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FixturesPage;
