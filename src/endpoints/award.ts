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
  // Get awards team(s) have won
  team?: number[];

  // Filter by other non-team winners (individual awards)
  winner?: string[];
}

export interface AwardOptionsFromTeam {
  // Filter awards by the event they were won
  event?: number[];

  // Filter awards by the season they were won in
  season?: number[];
}
