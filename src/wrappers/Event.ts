import { components, operations } from "../generated/robotevents.js";
import { EventData } from "../types.js";
import { Client, transformResponse } from "../utils/client.js";
import { Match } from "./Match.js";
import { Team } from "./Team.js";

export class Event implements EventData {
  client: Client;
  constructor(data: EventData, client: Client) {
    this.client = client;
    this.id = data.id;
    this.sku = data.sku;
    this.name = data.name;
    this.start = data.start;
    this.end = data.end;
    this.season = data.season;
    this.program = data.program;
    this.location = data.location;
    this.locations = data.locations;
    this.divisions = data.divisions;
    this.level = data.level;
    this.ongoing = data.ongoing;
    this.awards_finalized = data.awards_finalized;
    this.event_type = data.event_type;
  }

  // Event Data
  id: number;
  sku: string;
  name: string;
  start?: string | undefined;
  end?: string | undefined;
  season: { id: number; name: string; code?: string | null };
  program: { id: number; name: string; code?: string | null };
  location: {
    venue?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    region?: string;
    postcode?: string;
    country?: string;
    coordinates?: components["schemas"]["Coordinates"];
  };
  locations?:
    | {
        [key: string]: {
          venue?: string;
          address_1?: string;
          address_2?: string;
          city?: string;
          region?: string;
          postcode?: string;
          country?: string;
          coordinates?: components["schemas"]["Coordinates"];
        };
      }[]
    | undefined;
  divisions?: { id?: number; name?: string; order?: number }[] | undefined;
  level?:
    | "World"
    | "National"
    | "State"
    | "Signature"
    | "Other"
    | "Regional"
    | undefined;
  ongoing?: boolean | undefined;
  awards_finalized?: boolean | undefined;
  event_type?: "tournament" | "league" | "workshop" | "virtual" | undefined;

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
      event_type: this.event_type,
    };
  }

  toJSON() {
    return this.getData();
  }

  /**
   * Get teams at an event
   * @param query Team Search Options
   * @returns List of Teams
   */
  teams(
    query?: operations["event_getTeams"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return transformResponse(
      this.client.PaginatedGET("/events/{id}/teams", {
        params: { query, path: { id: this.id } },
        ...options,
      }),
      (data) => data.map((team) => new Team(team, this.client))
    );
  }

  /**
   * Get skills runs at an event
   * @param query Query Params
   * @returns Array of skills runs
   */
  skills(
    query?: operations["event_getSkills"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/events/{id}/skills", {
      params: { query, path: { id: this.id } },
      ...options,
    });
  }

  /**
   * Gets awards at an event
   * @param query Query Params
   * @returns Array of awards
   */
  awards(
    query?: operations["event_getAwards"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/events/{id}/awards", {
      params: { query, path: { id: this.id } },
      ...options,
    });
  }

  /**
   * Gets matches for a division
   * @param division
   * @param query Query Params
   * @returns Array of matches
   */
  matches(
    division: number,
    query?: operations["event_getDivisionMatches"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return transformResponse(
      this.client.PaginatedGET("/events/{id}/divisions/{div}/matches", {
        params: { query, path: { id: this.id, div: division } },
        ...options,
      }),
      (data) => data.map((match) => new Match(match))
    );
  }

  /**
   * Gets finalist rankings for a division (used in VIQRC)
   * @param division Division ID
   * @param query Query Params
   * @returns Array of finalist rankings
   */
  finalistRankings(
    division: number,
    query?: operations["event_getDivisionFinalistRankings"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET(
      "/events/{id}/divisions/{div}/finalistRankings",
      {
        params: { query, path: { id: this.id, div: division } },
        ...options,
      }
    );
  }

  /**
   * Gets rankings for a division
   * @param division Division ID
   * @param query Query Params
   * @returns List of rankings
   */
  rankings(
    division: number,
    query?: operations["event_getDivisionRankings"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/events/{id}/divisions/{div}/rankings", {
      params: { query, path: { id: this.id, div: division } },
      ...options,
    });
  }
}
