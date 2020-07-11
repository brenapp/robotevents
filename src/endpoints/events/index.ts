import search, { Level } from "./search";
import request, { requestSingle } from "../../util/request";
import WatchableCollection from "../../WatchableCollection";
import { Award, AwardOptionsFromEvent } from "../award";
import { MatchOptionsFromEvent, Match } from "../matches";
import { RankingOptionsFromEvent, Ranking } from "../rankings";
import { Team, TeamOptionsFromEvent, TeamData } from "../teams";
import Watchable from "../../Watchable";
import { Skill, SkillOptionsFromEvent } from "../skills";
import { IdInfo } from "..";
import { ProgramAbbr } from "../programs";

const re_strings: [number, string][] = [
  [1, "vex-robotics-competition"],
  [4, "college-competition"],
  [47, "workshops"],
  [40, "create-foundation"],
  [41, "vex-iq-challenge"],
  [42, "drones-in-school"],
  [43, "national-robotics-league"],
  [44, "rad"],
  [46, "tsavrc"],
  [47, "tsaviqc"],

  // TODO: Insert VAIC-HS and VAIC-U when they get added
];

const RE_PREFIXES = new Map<number, string>(re_strings);

export interface EventData {
  id: number;
  sku: string;
  name: string;

  // The date time when the event starts, in ISO format
  start: string;

  // The date time when the event ends, in ISO format
  end: string;

  // The season that the event takes place in
  season: IdInfo<null>;

  // The program for which the event
  program: IdInfo<ProgramAbbr>;

  // Location information about the event
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

  // The divisions of the event. Larger events will have multiple divisions, but most events have only a single divison. Many VEX IQ events will have many divisions.
  divisions: {
    id: number;
    name: string;
    order: number;
  }[];

  level: Level;

  // Whether the event is currently ongoing
  ongoing: boolean;

  // Whether the event has been finalized in RobotEvents
  awards_finalized: boolean;
}

export interface EventOptionsFromTeam {
  sku?: string[];
  season?: number[];
  start?: string;
  end?: string;
  level?: Level[];
}

export class Event extends Watchable<EventData> implements EventData {
  id = 0;
  sku = "";
  name = "";
  start = "";
  end = "";

  season = {
    id: 0,
    name: "",
    code: null,
  };

  program = {
    id: 0,
    name: "",
    code: "" as ProgramAbbr,
  };

  location = {
    venue: "",
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    postcode: null,
    country: null,
    coordinates: {
      lat: "",
      lon: "",
    },
  };

  divisions = [] as {
    id: number;
    name: string;
    order: number;
  }[];

  level = "Other" as Level;
  ongoing = false;
  awards_finalized = false;

  // Load the event
  constructor(data: EventData) {
    // Support watching
    super(() => requestSingle<EventData>(`events/${data.id}`, {}));

    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
  }

  /**
   * Gets the associated URL from robotevents for this event
   */
  getURL() {
    const prefix = RE_PREFIXES.get(this.program.id) as string;

    return `https://www.robotevents.com/robot-competitions/${prefix}/${this.sku}.html`;
  }

  // Watchable Collections

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
  teams(options: TeamOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<TeamData>(`events/${this.id}/teams`, options, 0).then((teams) =>
        teams.map((data) => new Team(data))
      )
    );
  }

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
  skills(options: SkillOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Skill>(`events/${this.id}/skills`, options, 0)
    );
  }

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
  awards(options: AwardOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Award>(`events/${this.id}/awards`, options, 0)
    );
  }

  /**
   * Gets the matches for an event, returns a watchable collection.
   *
   *
   * @example Scored Matches
   * const event = await robotevents.events.get(sku);
   * const matches = await event.matches(1); // Get current state of matches in Division 1
   * matches.watch();
   *
   * matches.on("add", match => console.log("Match Generated", match));
   * matches.on("update", match => console.log("Match Updated", match))
   *
   *
   * @param division Division ID
   * @param options Match Search Options
   */
  matches(division: number, options: MatchOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Match>(
        `events/${this.id}/divisions/${division ?? 1}/matches`,
        options,
        0
      )
    );
  }

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
  finalistRankings(division: number, options: RankingOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Ranking>(
        `events/${this.id}/divisions/${division ?? 1}/finalistRankings`,
        options,
        0
      )
    );
  }

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
  rankings(division: number, options: RankingOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Ranking>(
        `events/${this.id}/divisions/${division ?? 1}/rankings`,
        options,
        0
      )
    );
  }
}

/**
 * Gets an event by it's SKU or ID. Returns an Event class, or null if no event can be found
 *
 * @example
 * const event = await robotevents.events.get("RE-VRC-19-8312");
 * console.log(event.name);
 *
 * @example
 * const event = await robotevents.events.get(38312);
 * console.log(event.name);
 *
 * @param skuOrID The SKU (string) or ID (number) of the event
 * @param maxAge Maximum allowable age when using a cached value. If not specified, any suitable record from the cache may be used
 */
export async function get(skuOrID: string | number, maxAge?: number) {
  let events: EventData[] = [];

  if (typeof skuOrID == "string") {
    events = await search({ sku: [skuOrID] }, maxAge);
  } else if (typeof skuOrID) {
    events = await search({ id: [skuOrID] }, maxAge);
  }

  if (events.length < 1) {
    return null;
  }

  return new Event(events[0]);
}

export { default as search } from "./search";
