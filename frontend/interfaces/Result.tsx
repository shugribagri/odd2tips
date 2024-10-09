export interface Result {
  _id: string;
  date: string;
  league: string;
  teamOne: {
    name: string;
    score: string;
  };
  teamTwo: {
    name: string;
    score: string;
  };
  createdAt: string;
  updatedAt: string;
}
