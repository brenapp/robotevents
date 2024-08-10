import Watchable from "./Watchable.js";
import {
  EndpointOptions,
  Event as EventData,
  IdInfo,
  ProgramAbbr,
} from "../types.js";
import { EventLevel, Events, EventType } from "../generated/robotevents.js";
import WatchableCollection from "./WatchableCollection.js";
import { Team } from "./Team.js";

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
    code: "V5RC",
  } as IdInfo<ProgramAbbr>;

  location = {
    venue: "",
    address_1: "",
    address_2: "",
    city: "",
    region: "",
    postcode: "",
    country: "",
    coordinates: {
      lat: 0,
      lon: 0,
    },
  };

  locations = [];

  divisions = [];

  level = "Other" as EventLevel;
  ongoing = false;
  awards_finalized = false;
  eventType = undefined as EventType | undefined;

  api: EndpointOptions;

  // Load the event
  constructor(data: EventData, api: EndpointOptions) {
    super(() =>
      api
        .fetch<
          Events.EventGetEvent.ResponseBody,
          Events.EventGetEvent.RequestQuery
        >(`events/${data.id}`, {})
        .then((response) => (response.success ? response.data : undefined))
    );

    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }

    this.api = api;
  }

  /**
   * Gets the associated URL from robotevents for this event
   */
  getURL() {
    return `https://www.robotevents.com/${this.sku}.html`;
  }

  getData(): EventData {
    return {
      id: this.id,
      sku: this.sku,
      name: this.name,
      start: this.start,
      end: this.end,
      season: this.season,
      program: this.program,
      location: this.location,
      locations: this.locations,
      divisions: this.divisions,
      level: this.level,
      ongoing: this.ongoing,
      awards_finalized: this.awards_finalized,
      event_type: this.eventType,
    };
  }

  /**
   * Converts the team to JSON
   */
  toJSON() {
    return this.getData();
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
  teams(options: Events.EventGetTeams.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api
        .paginatedFetch<
          Events.EventGetTeams.ResponseBody,
          Events.EventGetTeams.RequestQuery
        >(`/events/${this.id}/teams`, options)
        .then((response) =>
          response.success
            ? {
                success: true,
                data:
                  response.data?.map((data) => new Team(data, this.api)) ?? [],
              }
            : response
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
  skills(options: Events.EventGetSkills.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Events.EventGetSkills.ResponseBody,
        Events.EventGetSkills.RequestQuery
      >(`/events/${this.id}/skills`, options)
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
  awards(options: Events.EventGetAwards.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Events.EventGetAwards.ResponseBody,
        Events.EventGetAwards.RequestQuery
      >(`/events/${this.id}/awards`, options)
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
  matches(
    division: number,
    options: Events.EventGetDivisionMatches.RequestQuery = {}
  ) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Events.EventGetDivisionMatches.ResponseBody,
        Events.EventGetDivisionMatches.RequestQuery
      >(`/events/${this.id}/divisions/${division}/matches`, options)
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
  finalistRankings(
    division: number,
    options: Events.EventGetDivisionFinalistRankings.RequestQuery = {}
  ) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Events.EventGetDivisionFinalistRankings.ResponseBody,
        Events.EventGetDivisionFinalistRankings.RequestQuery
      >(`/events/${this.id}/divisions/${division}/finalistRankings`, options)
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
  rankings(
    division: number,
    options: Events.EventGetDivisionRankings.RequestQuery = {}
  ) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Events.EventGetDivisionRankings.ResponseBody,
        Events.EventGetDivisionRankings.RequestQuery
      >(`/events/${this.id}/divisions/${division}/rankings`, options)
    );
  }
}
