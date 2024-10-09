export interface Prediction {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  last5home: string[];
  last5away: string[];
  prediction: string;
  matchUrl: string;
  homeOdd: string;
  drawOdd: string;
  awayOdd: string;
  date: string;
  competitionName: string;
  countryName: string;
  createdAt: string;
  updatedAt: string;
}
