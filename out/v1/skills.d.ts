/**
 * Support programmatic access to the Skills Leaderboard using the v1 API
 */
import { ProgramAbbr } from "../endpoints/programs";
import { Grade } from "../endpoints/teams";
export interface SkillsLeaderboardSpot {
    rank: number;
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
    event: {
        sku: string;
        startDate: string;
        seasonName: string;
    };
    scores: {
        score: number;
        programming: number;
        driver: number;
        maxProgramming: number;
        maxDriver: number;
        progScoredAt: string;
        driverScoredAt: string;
    };
    eligible: boolean;
}
export interface SkillsLeaderboardOptions {
    grade_level: Grade;
    post_season?: 1 | 0;
    region?: string;
}
export default function getSkillsLeaderboard(season: number, options: SkillsLeaderboardOptions): Promise<SkillsLeaderboardSpot[]>;
