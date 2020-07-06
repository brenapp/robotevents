/**
 * Support programmatic access to the Skills Leaderboard using the v1 API
 */

import { ProgramAbbr } from "../endpoints/programs";
import { Grade } from "../endpoints/teams";
import { requestSingle } from "../util/request";

export interface SkillsLeaderboardSpot {
  rank: number;

  // Information about the team who scored the run
  team: {
    id: number;
    program: ProgramAbbr;
    team: string;
    teamName: string;
    organization: string;
    city: string;
    region: string;
    country: string;
    gradeLevel: Grade;
    link: string;
    eventRegion: string;
    affiliations: string;
    eventRegionId: number;
  };

  // Information about the event the run took place at
  event: {
    sku: string;
    startDate: string;
    seasonName: string;
  };

  // Scoring information about the run
  scores: {
    score: number;
    programming: number;
    driver: number;
    maxProgramming: number;
    maxDriver: number;
    progScoredAt: string;
    driverScoredAt: string;
  };

  // Whether the skills run is eligible for qualification
  eligible: boolean;
}

export interface SkillsLeaderboardOptions {
  // Filter by the grade level of teams.
  grade_level: Grade;

  // Whether to include post season results. Defaults to false
  post_season?: 1 | 0;

  // Filter by the team's region
  region?: string;
}

/**
 *
 * @param season Season ID
 * @param options Search Options
 * @param maxAge Maximum allowable age when using a cached value. If not
 * specified, any suitable record from the cache may be used
 */
export default async function getSkillsLeaderboard(
  season: number,
  options: SkillsLeaderboardOptions,
  maxAge?: number
) {
  let results = await requestSingle<SkillsLeaderboardSpot[]>(
    `/api/seasons/${season}/skills`,
    { grade_level: options.grade_level, post_season: options.post_season },
    maxAge
  );

  if (options.region) {
    results = results.filter(
      (spot) => spot.team.eventRegion === options.region
    );
  }

  return results;
}
