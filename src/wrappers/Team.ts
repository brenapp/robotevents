import {
  EndpointOptions,
  Grade,
  IdInfo,
  ProgramAbbr,
  TeamData,
} from "../types.js";
import Watchable from "./Watchable.js";
import { Teams } from "../generated/robotevents.js";
import WatchableCollection from "./WatchableCollection.js";

export class Team extends Watchable<TeamData> implements TeamData {
  // Team Data
  id = 0;

  number = "";
  team_name = "";
  robot_name = "";
  organization = "";

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

  registered = false;
  program = { id: 0, name: "", code: "V5RC" } as IdInfo<ProgramAbbr>;
  grade = "High School" as Grade;

  api: EndpointOptions;

  constructor(data: TeamData, api: EndpointOptions) {
    super(() =>
      api
        .fetch<
          Teams.TeamGetTeam.ResponseBody,
          Teams.TeamGetTeam.RequestQuery
        >(`teams/${data.id}`, { id: [data.id] })
        .then((response) => (response.success ? response.data : undefined))
    );

    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
    this.api = api;
  }

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

  // Watchable Collections

  /**
   * Gets all events the team has gone to
   * @param options Event Options
   *
   * @example
   * const team = await robotevents.teams.get(number);
   * const events = await team.events({
   *  level: ["State", "National", "Signature"]
   * });
   *
   * for (const event of events) {
   *  console.log(event);
   * }
   *
   */
  events(options: Teams.TeamGetEvents.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Teams.TeamGetEvents.ResponseBody,
        Teams.TeamGetEvents.RequestQuery
      >(`/teams/${this.id}/events`, options)
    );
  }

  /**
   * Gets all matches for the team
   * @param options
   *  @param options.event Event IDs
   *  @param options.season Season IDs
   *  @param options.rounds Possible match rounds to search
   *  @param options.instance Possible match instances to search
   *  @param options.matchnum Possible match numbers to search
   *
   * @example
   * const team = await robotevents.teams.get(number);
   * const matches = await team.matches();
   * matches.watch();
   *
   * matches.on("add", match => {
   *  console.log("Match generated")
   * })
   *
   */
  matches(options: Teams.TeamGetMatches.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Teams.TeamGetMatches.ResponseBody,
        Teams.TeamGetMatches.RequestQuery
      >(`/teams/${this.id}/matches`, options)
    );
  }

  /**
   * Gets a team's rankings
   * @param options Ranking Options
   *  @param options.event Event IDs
   *  @param options.rank Possible ranks to search for
   *  @param options.season Season IDs
   */
  rankings(options: Teams.TeamGetRankings.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Teams.TeamGetRankings.ResponseBody,
        Teams.TeamGetRankings.RequestQuery
      >(`/teams/${this.id}/rankings`, options)
    );
  }

  /**
   * Gets a team's skills runs
   * @param options Skills Run Options
   *  @param options.event Event IDs to filter
   *  @param options.type Possible skills run types ("driver" or "programming")
   *  @param options.season Season IDs
   */
  skills(options: Teams.TeamGetSkills.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Teams.TeamGetSkills.ResponseBody,
        Teams.TeamGetSkills.RequestQuery
      >(`/teams/${this.id}/skills`, options)
    );
  }

  /**
   * Gets a team's awards
   * @param options Awards Options
   *  @param options.event Event IDs to filter by
   *  @param options.season Season IDs to filter by
   */
  awards(options: Teams.TeamGetAwards.RequestQuery = {}) {
    return WatchableCollection.create(() =>
      this.api.paginatedFetch<
        Teams.TeamGetAwards.ResponseBody,
        Teams.TeamGetAwards.RequestQuery
      >(`/teams/${this.id}/awards`, options)
    );
  }
}
