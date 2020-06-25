import { Level } from "./search";
import WatchableCollection from "../../WatchableCollection";
import { Award, AwardOptionsFromEvent } from "../award";
import { MatchOptionsFromEvent, Match } from "../matches";
import { RankingOptionsFromEvent, Ranking } from "../rankings";
import { Team, TeamOptionsFromEvent } from "../teams";
import Watchable from "../../Watchable";
import { Skill, SkillOptionsFromEvent } from "../skills";
export interface EventData {
    id: number;
    sku: string;
    name: string;
    start: string;
    end: string;
    season: {
        id: number;
        name: string;
        code: string | null;
    };
    program: {
        id: number;
        name: string;
        code: string;
    };
    location: {
        venue: string;
        address_1: string | null;
        address_2: string | null;
        city: string | null;
        region: string | null;
        postcode: string | null;
        country: string | null;
        coordinates: {
            lat: string;
            lon: string;
        };
    };
    divisions: {
        id: number;
        name: string;
        order: number;
    }[];
    level: Level;
    ongoing: boolean;
    awards_finalized: boolean;
}
export interface EventOptionsFromTeam {
    sku?: string[];
    season?: number[];
    start?: string;
    end?: string;
    level?: Level[];
}
export declare class Event extends Watchable<EventData> implements EventData {
    id: number;
    sku: string;
    name: string;
    start: string;
    end: string;
    season: {
        id: number;
        name: string;
        code: null;
    };
    program: {
        id: number;
        name: string;
        code: string;
    };
    location: {
        venue: string;
        address_1: null;
        address_2: null;
        city: null;
        region: null;
        postcode: null;
        country: null;
        coordinates: {
            lat: string;
            lon: string;
        };
    };
    divisions: {
        id: number;
        name: string;
        order: number;
    }[];
    level: Level;
    ongoing: boolean;
    awards_finalized: boolean;
    constructor(data: EventData);
    /**
     * Gets teams at an event
     * @param options Search Options
     *
     * @example Basic Usage
     * const event = await robotevents.events.get(sku);
     * const teams = await event.teams();
     *
     * for (const team of teams) {
     *  console.log(team);
     * }
     *
     * @example Watch for Team Changes
     * teams.watch();
     *
     * teams.on("add", team => {
     *  console.log("Team added", team);
     * })
     *
     * teams.on("remove", team => {
     *  console.log("Team removed", team);
     * });
     *
     */
    teams(options?: TeamOptionsFromEvent): Promise<WatchableCollection<Team, number>>;
    /**
     * Gets skills data at an event, as a watchable collection
     * @param options Skills Options
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const skills = await event.skills({
     *  type: ["driver"]
     * });
     *
     * for (const run of skills) {
     *  console.log(run);
     * }
     *
     * skills.watch();
     * skills.on("add", console.log)
     *
     */
    skills(options?: SkillOptionsFromEvent): Promise<WatchableCollection<Skill, number>>;
    /**
     * Gets the awards for the event, returns a watchable collection
     * @param options Award Search Options
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const awards = await event.matches(1);
     *
     * for (const award of awards) {
     *  console.log(awards)
     * }
     *
     */
    awards(options?: AwardOptionsFromEvent): Promise<WatchableCollection<Award, number>>;
    /**
     * Gets the matches for an event, returns a watchable collection.
     *
     *
     * @example Scored Matches
     * const event = await robotevents.event(sku);
     * const matches = await event.matches(1); // Get current state of matches in Division 1
     * matches.watch();
     *
     * matches.on("add", match => {
     *  if (match.scored) {
     *    console.log("Match Scored", match)
     *  } else {
     *    console.log("Match Generated", match)
     *  }
     * })
     *
     *
     * @param division Division ID
     * @param options Match Search Options
     */
    matches(division: number, options?: MatchOptionsFromEvent): Promise<WatchableCollection<Match, number>>;
    /**
     *
     * @param division Division ID
     * @param options Ranking Search Options
     *
     * (VEX IQ only)
     * Gets the finalist rankings for an event
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const rankings = await event.finalistRankings(1, { rank: [1] });
     * rankings.watch();
     *
     * ranking.on("add", rank => {
     *  console.log("First Place Rank Update", rank);
     * });
     *
     *
     */
    finalistRankings(division: number, options?: RankingOptionsFromEvent): Promise<WatchableCollection<Ranking, number>>;
    /**
     *
     * @param division Division ID
     * @param options Ranking Search Options
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const rankings = await event.rankings(1, { rank: [1] });
     * rankings.watch();
     *
     * ranking.on("add", rank => {
     *  console.log("First Place Rank Update", rank);
     * });
     *
     *
     */
    rankings(division: number, options?: RankingOptionsFromEvent): Promise<WatchableCollection<Ranking, number>>;
}
export declare function get(skuOrID: string | number): Promise<Event>;
export { default as search } from "./search";
