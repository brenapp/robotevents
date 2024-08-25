import { components, operations } from "../generated/robotevents.js";
import { TeamData } from "../types.js";
import { Client, transformResponse } from "../utils/client.js";
import { Event } from "./Event.js";
import { Match } from "./Match.js";

export class Team implements TeamData {
  client: Client;
  constructor(data: TeamData, client: Client) {
    this.client = client;
    this.id = data.id;
    this.number = data.number;
    this.team_name = data.team_name;
    this.robot_name = data.robot_name;
    this.organization = data.organization;
    this.location = data.location;
    this.registered = data.registered;
    this.program = data.program;
    this.grade = data.grade;
  }

  // Team Data
  id: number;
  number: string;
  team_name?: string | undefined;
  robot_name?: string | undefined;
  organization?: string | undefined;
  location?:
    | {
        venue?: string;
        address_1?: string;
        address_2?: string;
        city?: string;
        region?: string;
        postcode?: string;
        country?: string;
        coordinates?: components["schemas"]["Coordinates"];
      }
    | undefined;
  registered?: boolean | undefined;
  program: { id: number; name: string; code?: string | null };
  grade?:
    | "College"
    | "High School"
    | "Middle School"
    | "Elementary School"
    | undefined;

  /**
   * Gets the RobotEvents listing for the team
   */
  getURL() {
    return `https://www.robotevents.com/teams/${this.program.code}/${this.number}`;
  }

  /**
   * Returns the raw response from RobotEvents
   */
  getData(): TeamData {
    return {
      id: this.id,
      number: this.number,
      team_name: this.team_name,
      robot_name: this.robot_name,
      organization: this.organization,
      location: this.location,
      registered: this.registered,
      program: this.program,
      grade: this.grade,
    };
  }

  /**
   * Converts the team to JSON
   */
  toJSON() {
    return this.getData();
  }

  /**
   * Get events the team has attended (or registered for)
   * @param query Query Params
   * @returns List of events
   */
  events(
    query: operations["team_getEvents"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return transformResponse(
      this.client.PaginatedGET("/teams/{id}/events", {
        params: { path: { id: this.id }, query },
        ...options,
      }),
      (data) => data.map((event) => new Event(event, this.client))
    );
  }

  /**
   * Get matches the team has played
   * @param query Query Params
   * @returns List of matches
   */
  matches(
    query: operations["team_getMatches"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return transformResponse(
      this.client.PaginatedGET("/teams/{id}/matches", {
        params: { path: { id: this.id }, query },
        ...options,
      }),
      (data) => data.map((match) => new Match(match))
    );
  }

  /**
   * Get rankings for the team
   * @param query Query Params
   * @returns List of rankings
   */
  rankings(
    query: operations["team_getRankings"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/teams/{id}/rankings", {
      params: { path: { id: this.id }, query },
      ...options,
    });
  }

  /**
   * Get skills runs for the team
   * @param query Query Params
   * @returns List of skills runs
   */
  skills(
    query: operations["team_getSkills"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/teams/{id}/skills", {
      params: { path: { id: this.id }, query },
    });
  }

  /**
   * Get awards the team has won
   * @param query Query Params
   * @returns List of awards
   */
  awards(
    query: operations["team_getAwards"]["parameters"]["query"],
    options?: Omit<RequestInit, "body" | "headers">
  ) {
    return this.client.PaginatedGET("/teams/{id}/awards", {
      params: { path: { id: this.id }, query },
      ...options,
    });
  }
}
