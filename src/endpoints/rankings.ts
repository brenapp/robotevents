import { IdInfo } from ".";

/**
 * Information about how a team ranked at an event. Note for VIQC events, all
 * matches will be listed as ties, and SP refers to the average match score.
 * Thus, when sorting for VIQC events, you should rank teams by their SP score
 */
export interface Ranking {
  id: number;

  // The event where the team ranked
  event: IdInfo;

  // The division where the team ranked
  division: IdInfo;

  // The local rank in the division/event
  rank: number;

  // The team that ranked
  team: IdInfo;

  // The number of wins associated with this rank
  wins: number;

  // The number of losses associated with this rank
  losses: number;

  // The number of ties associated with this rank
  ties: number;

  // The number of WP awarded to this team at the event
  wp: number;

  // The number of AP awarded to this team at the event
  ap: number;

  // The number of SP awarded to this team at the event
  sp: number;

  // The highest match score performed by the team at this event
  high_score: number;
}

export interface RankingOptionsFromEvent {
  team?: number[];
  rank?: number[];
}

export interface RankingOptionsFromTeam {
  event?: number[];
  rank?: number[];
  season?: number[];
}
