import { IdInfo } from "..";
import Watchable from "../../Watchable";
import request, { requestSingle } from "../../util/request";
import WatchableCollection from "../../WatchableCollection";
import { EventData, EventOptionsFromTeam, Event } from "../events";
import { MatchOptionsFromTeam, Match } from "../matches";
import { RankingOptionsFromTeam, Ranking } from "../rankings";
import { SkillOptionsFromTeam, Skill } from "../skills";
import { AwardOptionsFromTeam, Award } from "../award";
import { search } from "./search";

export type Grade =
  | "College"
  | "High School"
  | "Middle School"
  | "Elementary School";

export interface TeamData {
  id: number;

  number: string;
  team_name: string;
  robot_name: string;
  organization: string;

  location: {
    venue: string | null;
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

  registered: boolean;
  program: IdInfo;
  grade: Grade;
}

export interface TeamOptionsFromEvent {
  number?: string;
  registered?: boolean;
  grade?: Grade[];
  country?: string[];
}

export class Team extends Watchable<TeamData> implements TeamData {
  // Team Data
  id = 0;

  number = "";
  team_name = "";
  robot_name = "";
  organization = "";

  location = {
    venue: null,
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

  registered = false;
  program = { id: 0, name: "", code: null };
  grade = "High School" as Grade;

  constructor(data: TeamData) {
    super(() => requestSingle<TeamData>(`teams/${data.id}`, { id: [data.id] }));

    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
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
  events(options: EventOptionsFromTeam = {}) {
    return WatchableCollection.create(() =>
      request<EventData>(
        `teams/${this.id}/events`,
        options,
        0
      ).then((response) => response.map((data) => new Event(data)))
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
  matches(options: MatchOptionsFromTeam = {}) {
    return WatchableCollection.create(() =>
      request<Match>(`teams/${this.id}/matches`, options, 0)
    );
  }

  /**
   * Gets a team's rankings
   * @param options Ranking Options
   *  @param options.event Event IDs
   *  @param options.rank Possible ranks to search for
   *  @param options.season Season IDs
   */
  rankings(options: RankingOptionsFromTeam = {}) {
    return WatchableCollection.create(() =>
      request<Ranking>(`teams/${this.id}/rankings`, options, 0)
    );
  }

  /**
   * Gets a team's skills runs
   * @param options Skills Run Options
   *  @param options.event Event IDs to filter
   *  @param options.type Possible skills run types ("driver" or "programming")
   *  @param options.season Season IDs
   */
  skills(options: SkillOptionsFromTeam = {}) {
    return WatchableCollection.create(() =>
      request<Skill>(`teams/${this.id}/skills`, options, 0)
    );
  }

  /**
   * Gets a team's awards
   * @param options Awards Options
   *  @param options.event Event IDs to filter by
   *  @param options.season Season IDs to filter by
   */
  awards(options: AwardOptionsFromTeam = {}) {
    return WatchableCollection.create(() =>
      request<Award>(`teams/${this.id}/awards`, options, 0)
    );
  }
}

export async function get(numberOrID: string | number) {
  let teams: TeamData[] = [];

  if (typeof numberOrID == "string") {
    teams = await search({ number: [numberOrID] });
  } else if (typeof numberOrID) {
    teams = await search({ id: [numberOrID] });
  }

  if (teams.length < 1) {
    return Promise.reject(new Error(`No team with Number/ID ${numberOrID}`));
  }

  return new Team(teams[0]);
}
export { search } from "./search";
