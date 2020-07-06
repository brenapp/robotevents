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

  // The round the event took place in (Practice, Quals, R16 QF, SF, F)
  round: Round;

  // The instance the event took place in. For example the first R16 match
  // played at an event (between the 16th and 1st seed in VRC) has instance 1
  instance: number;

  // The match number in a specific match instance. In most cases this is one,
  // but in the case of ties or competitions with multiple elimination it can be
  // higher
  matchnum: number;

  // When the match is scheduled to start, in an ISO date time string
  scheduled: string;

  // When the match actually started, in an ISO date time string
  started: string;

  // The field name that the match took place on
  field: string;

  // Whether the match score has been entered into RobotEvents
  scored: boolean;

  // The name of the Match. Looks like Q15 or R16 1-1 or F3
  name: string;

  // The alliances involved in the match
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
