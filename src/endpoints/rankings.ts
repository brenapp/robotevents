import { IdInfo } from ".";

export interface Ranking {
  id: number;
  event: IdInfo;
  division: IdInfo;
  rank: number;
  team: IdInfo;

  wins: number;
  losses: number;
  ties: number;

  wp: number;
  ap: number;
  sp: number;

  high_score: number;
}

export interface RankingOptionsFromEvent {
  team?: number[];
  rank?: number[];
}
