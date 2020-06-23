import { IdInfo } from "./index";

export interface Alliance {
  color: "red" | "blue";
  score: number;
  teams: {
    team: IdInfo;
    sitting: boolean;
  }[];
}

export enum Round {
  Practice = 1,
  Qualification = 2,
  Quarterfinals = 3,
  Semifinals = 4,
  Finals = 5,
  RoundOf16 = 6,
}

export interface Match {
  id: number;
  event: IdInfo;
  division: IdInfo;

  round: Round;
  instance: number;
  matchnum: number;

  scheduled: string;
  started: string;

  field: string;
  scored: boolean;
  name: string;

  alliances: Alliance[];
}

export interface MatchOptionsFromEvent {
  team?: number[];

  round?: Round[];
  instance?: number[];
  matchnum?: number[];
}

export interface MatchOptionsFromTeam {
  event?: number[];
  season?: number[];
  round?: Round[];
  instance?: number[];
  matchnum?: number[];
}
