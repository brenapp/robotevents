import { IdInfo } from ".";

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

export interface AwardOptionsFromEvent {
  team?: number[];
  winner?: string[];
}

export interface AwardOptionsFromTeam {
  event?: number[];
  season?: number[];
}
