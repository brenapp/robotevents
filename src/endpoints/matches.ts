import { IdInfo } from "./index";

export interface Alliance {
  color: "red" | "blue";
  score: number;
  teams: {
    team: IdInfo;
    sitting: boolean;
  }[];
}

export interface Match {
  id: number;
  event: IdInfo;
  division: IdInfo;

  round: number;
  instance: number;
  matchnum: number;

  scheduled: string;
  started: string;

  field: string;
  scored: boolean;
  name: string;

  alliances: Alliance[];
}
