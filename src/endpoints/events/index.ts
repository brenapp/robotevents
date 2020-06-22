/**
 * A single event
 */

import search, { Level } from "./search";
import request from "../../util/request";
import WatchableCollection from "../../WatchableCollection";
import { Award, AwardOptionsFromEvent } from "../award";
import { MatchOptionsFromEvent, Match } from "../matches";
import { RankingOptionsFromEvent, Ranking } from "../rankings";
import Team, { TeamOptionsFromEvent, TeamData } from "../team";
import Watchable from "../../Watchable";

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
    code: "",
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
    super(() => search({ id: [data.id] }).then((results) => results[0]));

    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
  }

  // Watchable Collections

  /**
   * Gets the awards for the event, returns a watchable collection
   * @param options Award Search Options
   *
   * Remember, Watchable Collection will issue "add" for any change in award information, which can be
   *  - Award Created
   *  - Award Assigned Winner(s)
   *  - Award Qualification Changed
   *
   * @example
   * const event = await robotevents.event(sku);
   * const awards = await event.matches(1);
   *
   * for (const award of awards) {
   *  console.log(awards)
   * }
   *
   */
  awards(options: AwardOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Award>(`events/${this.id}/awards`, options, true)
    );
  }

  /**
   * Gets the matches for an event, returns a watchable collection.
   *
   * Note: When watching, this collection will issue "add" for any change in the match information, this can mean:
   *  - Match Generated
   *  - Match Scored
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
  matches(division: number, options: MatchOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Match>(
        `events/${this.id}/divisions/${division}/matches`,
        options,
        true
      )
    );
  }

  /**
   *
   * @param division Division ID
   * @param options Ranking Search Options
   *
   * For rankings, you want to use "add" as your primary event if listening, as it will be issued on any update (basically every time matches are entered into Tournament Manager)
   *
   * @example
   * const event = await robotevents.event(sku);
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
        `events/${this.id}/divisions/${division}/rankings`,
        options,
        true
      )
    );
  }

  /**
   * Gets teams at an event
   * @param options Search Options
   *
   * @example Basic Usage
   * const event = await robotevents.event(sku);
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
      request<TeamData>(
        `events/${this.id}/teams`,
        options,
        true
      ).then((teams) => teams.map((data) => new Team(data)))
    );
  }
}

export default async function get(skuOrID: string | number) {
  const events: EventData[] = [];

  if (typeof skuOrID == "string") {
    events.push(...(await search({ sku: [skuOrID] })));
  } else if (typeof skuOrID) {
    events.push(...(await search({ id: [skuOrID] })));
  }

  if (events.length < 1) {
    return Promise.reject(new Error(`No event with SKU/ID ${skuOrID}`));
  }

  return new Event(events[0]);
}
