import { IdInfo } from "..";

export interface Award {
  id: number;
  event: IdInfo;

  order: number;
  title: string;
  qualifications: string[];

  teamWinners: {
    division: IdInfo;
    team: IdInfo;
  }[];
  individualWinners: string[];
}

export interface AwardOptions {
  team?: number[];
  winner?: string[];
}
