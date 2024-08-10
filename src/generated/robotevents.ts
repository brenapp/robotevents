/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Event {
  /** @format int32 */
  id: number;
  sku: string;
  name: string;
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
  season: IdInfo;
  program: IdInfo;
  location: Location;
  locations?: Locations[];
  divisions?: Division[];
  level?: EventLevel;
  ongoing?: boolean;
  awards_finalized?: boolean;
  event_type?: EventType;
}

export type EventType = "tournament" | "league" | "workshop" | "virtual";

export interface Program {
  /** @format i32 */
  id?: number;
  abbr?: string;
  name?: string;
}

export type EventLevel = "World" | "National" | "Regional" | "State" | "Signature" | "Other";

export interface Location {
  venue?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  /** @format float */
  lat?: number;
  /** @format float */
  lon?: number;
}

export type Locations = Record<string, Location>;

export interface Division {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format int32 */
  order?: number;
}

export type Grade = "College" | "High School" | "Middle School" | "Elementary School";

export interface Team {
  /** @format int32 */
  id: number;
  number: string;
  team_name?: string;
  robot_name?: string;
  organization?: string;
  location?: Location;
  registered?: boolean;
  program: IdInfo;
  grade?: Grade;
}

export interface IdInfo {
  /** @format int32 */
  id: number;
  name: string;
  code?: string | null;
}

export interface MatchObj {
  /** @format int32 */
  id: number;
  event: IdInfo;
  division: IdInfo;
  /** @format int32 */
  round: number;
  /** @format int32 */
  instance: number;
  /** @format int32 */
  matchnum: number;
  /** @format date-time */
  scheduled?: string;
  /** @format date-time */
  started?: string;
  field?: string;
  scored: boolean;
  name: string;
  alliances: Alliance[];
}

export interface Alliance {
  color: AllianceColorEnum;
  /** @format int32 */
  score: number;
  teams: AllianceTeam[];
}

export interface AllianceTeam {
  team?: IdInfo;
  sitting?: boolean;
}

export interface Ranking {
  /** @format int32 */
  id?: number;
  event?: IdInfo;
  division?: IdInfo;
  /** @format int32 */
  rank?: number;
  team?: IdInfo;
  /** @format int32 */
  wins?: number;
  /** @format int32 */
  losses?: number;
  /** @format int32 */
  ties?: number;
  /** @format int32 */
  wp?: number;
  /** @format int32 */
  ap?: number;
  /** @format int32 */
  sp?: number;
  /** @format int32 */
  high_score?: number;
  average_points?: number;
  /** @format int32 */
  total_points?: number;
}

export interface Skill {
  /** @format int32 */
  id?: number;
  event?: IdInfo;
  team?: IdInfo;
  type?: SkillType;
  season?: IdInfo;
  division?: IdInfo;
  /** @format int32 */
  rank?: number;
  /** @format int32 */
  score?: number;
  /** @format int32 */
  attempts?: number;
}

export type SkillType = "driver" | "programming" | "package_delivery_time";

export interface Award {
  /** @format int32 */
  id?: number;
  event?: IdInfo;
  /** @format int32 */
  order?: number;
  title?: string;
  qualifications?: string[];
  /** Some awards are given out per tournament or division */
  designation?: AwardDesignationEnum;
  classification?: AwardClassificationEnum;
  teamWinners?: TeamAwardWinner[];
  individualWinners?: string[];
}

export interface TeamAwardWinner {
  division?: IdInfo;
  team?: IdInfo;
}

export interface Season {
  /** @format int32 */
  id?: number;
  name?: string;
  program?: IdInfo;
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
  /** @format int32 */
  years_start?: number;
  /** @format int32 */
  years_end?: number;
}

export interface Error {
  /** @format int32 */
  code?: number;
  message?: string;
}

export interface PageMeta {
  current_page?: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}

export interface PaginatedTeam {
  meta?: PageMeta;
  data?: Team[];
}

export interface PaginatedEvent {
  meta?: PageMeta;
  data?: Event[];
}

export interface PaginatedAward {
  meta?: PageMeta;
  data?: Award[];
}

export interface PaginatedSeason {
  meta?: PageMeta;
  data?: Season[];
}

export interface PaginatedRanking {
  meta?: PageMeta;
  data?: Ranking[];
}

export interface PaginatedMatch {
  meta?: PageMeta;
  data?: MatchObj[];
}

export interface PaginatedSkill {
  meta?: PageMeta;
  data?: Skill[];
}

export interface PaginatedProgram {
  meta?: PageMeta;
  data?: Program[];
}

export type AllianceColorEnum = "red" | "blue";

/** Some awards are given out per tournament or division */
export type AwardDesignationEnum = "tournament" | "division";

export type AwardClassificationEnum = "champion" | "finalist" | "semifinalist" | "quarterfinalist";

export type EventGetEventsParamsLevelEnum = "World" | "National" | "State" | "Signature" | "Other";

export type EventGetTeamsParamsGradeEnum = "College" | "High School" | "Middle School" | "Elementary School";

export type EventGetSkillsParamsTypeEnum = "driver" | "programming";

export type TeamGetTeamsParamsGradeEnum = "College" | "High School" | "Middle School" | "Elementary School";

export type TeamGetEventsParamsLevelEnum = "World" | "National" | "State" | "Signature" | "Other";

export type TeamGetSkillsParamsTypeEnum = "driver" | "programming";

export type SeasonGetEventsParamsLevelEnum = "World" | "National" | "State" | "Signature" | "Other";

export namespace Events {
  /**
   * @description Gets a List of Events
   * @tags Event
   * @name EventGetEvents
   * @request GET:/events
   * @secure
   */
  export namespace EventGetEvents {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by Event ID */
      "id[]"?: number[];
      /** Filter by Event SKU */
      "sku[]"?: string[];
      /** Filter by Teams that participated in the Event */
      "team[]"?: number[];
      /** Filter by the Season that the Event belonged to */
      "season[]"?: number[];
      /**
       * Filter by the Start Date of the Event
       * @format date-time
       */
      start?: string;
      /**
       * Filter by the End Date of the Event
       * @format date-time
       */
      end?: string;
      /** Filter by the region of the event */
      region?: string;
      /** Filter by the Event Level */
      "level[]"?: EventGetEventsParamsLevelEnum[];
      /**
       * Only show events that have at least one registered team associated with the authenticated user.
       * @default false
       */
      myEvents?: boolean;
      /** Filter by the Event Type */
      "eventTypes[]"?: EventType[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedEvent;
  }

  /**
   * @description Gets a Single Event
   * @tags Event
   * @name EventGetEvent
   * @request GET:/events/{id}
   * @secure
   */
  export namespace EventGetEvent {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Event;
  }

  /**
   * @description Gets a List of Teams present at a given Event
   * @tags Event
   * @name EventGetTeams
   * @request GET:/events/{id}/teams
   * @secure
   */
  export namespace EventGetTeams {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by Team Number */
      "number[]"?: string[];
      /** Filter by whether the Team is Registered */
      registered?: boolean;
      /** Filter by the Grade of the Team */
      "grade[]"?: EventGetTeamsParamsGradeEnum[];
      /** Filter by the Country of the Team */
      "country[]"?: string[];
      /**
       * Only show teams associated with the authenticated user.
       * @default false
       */
      myTeams?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedTeam;
  }

  /**
   * @description Gets a List of Skills runs performed at a given Event
   * @tags Event
   * @name EventGetSkills
   * @request GET:/events/{id}/skills
   * @secure
   */
  export namespace EventGetSkills {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by Team Number that performed the Skills run */
      "team[]"?: number[];
      /** Filter by Type of Skills run */
      "type[]"?: EventGetSkillsParamsTypeEnum[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedSkill;
  }

  /**
   * @description Gets a List of Awards at a given Event
   * @tags Event
   * @name EventGetAwards
   * @request GET:/events/{id}/awards
   * @secure
   */
  export namespace EventGetAwards {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by Team Number that the Award was awarded to */
      "team[]"?: number[];
      /** Filter by the Winner of the Award (can include people's names, etc.) */
      "winner[]"?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedAward;
  }

  /**
   * @description Gets a List of Matches for a single Division of an Event
   * @tags Event
   * @name EventGetDivisionMatches
   * @request GET:/events/{id}/divisions/{div}/matches
   * @secure
   */
  export namespace EventGetDivisionMatches {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
      /**
       * The ID of the Division
       * @format int32
       */
      div: number;
    };
    export type RequestQuery = {
      /** Filter to only return Matches which involved given Teams */
      "team[]"?: number[];
      /**
       * Filter by the Round of the Match.
       * Some typical values are shown below:
       * - 1 - Practice
       * - 2 - Qualification
       * - 3 - Quarter-Finals
       * - 4 - Semi-Finals
       * - 5 - Finals
       * - 6 - Round of 16
       * - etc.
       */
      "round[]"?: number[];
      /** Filter by the Instance of the Match. This is used to describe which Quarter-Final match (for example) is being played */
      "instance[]"?: number[];
      /** Filter by the MatchNum of the Match. This is the actual Match "number", e.g. Qualification Match, or the individual match in a Best of 3 */
      "matchnum[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedMatch;
  }

  /**
   * @description Gets a List of Finalist Rankings for a single Division of an Event
   * @tags Event
   * @name EventGetDivisionFinalistRankings
   * @request GET:/events/{id}/divisions/{div}/finalistRankings
   * @secure
   */
  export namespace EventGetDivisionFinalistRankings {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
      /**
       * The ID of the Division
       * @format int32
       */
      div: number;
    };
    export type RequestQuery = {
      /** Filter to only return Rankings which involve given Teams */
      "team[]"?: number[];
      /** Filter by the Rank */
      "rank[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedRanking;
  }

  /**
   * @description Gets a List of Rankings for a single Division of an Event
   * @tags Event
   * @name EventGetDivisionRankings
   * @request GET:/events/{id}/divisions/{div}/rankings
   * @secure
   */
  export namespace EventGetDivisionRankings {
    export type RequestParams = {
      /**
       * The ID of the Event
       * @format int32
       */
      id: number;
      /**
       * The ID of the Division
       * @format int32
       */
      div: number;
    };
    export type RequestQuery = {
      /** Filter to only return Rankings which involve given Teams */
      "team[]"?: number[];
      /** Filter by the Rank */
      "rank[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedRanking;
  }
}

export namespace Teams {
  /**
   * @description Gets a List of Teams
   * @tags Team
   * @name TeamGetTeams
   * @request GET:/teams
   * @secure
   */
  export namespace TeamGetTeams {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by Team ID */
      "id[]"?: number[];
      /** Filter by Team Number */
      "number[]"?: string[];
      /** Filter by Events that Teams have attended */
      "event[]"?: number[];
      /** Filter by whether or not the Team is Registered */
      registered?: boolean;
      /** Filter by the Program that the Team is part of */
      "program[]"?: number[];
      /** Filter by the Grade of the Team */
      "grade[]"?: TeamGetTeamsParamsGradeEnum[];
      /** Filter by the Country of the Team */
      "country[]"?: string[];
      /**
       * Only show teams associated with the authenticated user.
       * @default false
       */
      myTeams?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedTeam;
  }

  /**
   * @description Gets a Single Team
   * @tags Team
   * @name TeamGetTeam
   * @request GET:/teams/{id}
   * @secure
   */
  export namespace TeamGetTeam {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Team;
  }

  /**
   * @description Gets a List of Events that a given Team has attended
   * @tags Team
   * @name TeamGetEvents
   * @request GET:/teams/{id}/events
   * @secure
   */
  export namespace TeamGetEvents {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by Event SKU */
      "sku[]"?: string[];
      /** Filter by the Season that the Event belonged to */
      "season[]"?: number[];
      /**
       * Filter by the Start Date of the Event
       * @format date-time
       */
      start?: string;
      /**
       * Filter by the End Date of the Event
       * @format date-time
       */
      end?: string;
      /** Filter by the Event Level */
      "level[]"?: TeamGetEventsParamsLevelEnum[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedEvent;
  }

  /**
   * @description Gets a List of Matches that a given Team has played in
   * @tags Team
   * @name TeamGetMatches
   * @request GET:/teams/{id}/matches
   * @secure
   */
  export namespace TeamGetMatches {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by the Event the Match was performed at */
      "event[]"?: number[];
      /** Filter by the Season during which the Match was played */
      "season[]"?: number[];
      /**
       * Filter by the Round of the Match.
       * Some typical values are shown below:
       * - 1 - Practice
       * - 2 - Qualification
       * - 3 - Quarter-Finals
       * - 4 - Semi-Finals
       * - 5 - Finals
       * - 6 - Round of 16
       * - etc.
       */
      "round[]"?: number[];
      /** Filter by the Instance of the Match. This is used to describe which Quarter-Final match (for example) is being played */
      "instance[]"?: number[];
      /** Filter by the MatchNum of the Match. This is the actual Match "number", e.g. Qualification Match, or the individual match in a Best of 3 */
      "matchnum[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedMatch;
  }

  /**
   * @description Gets a List of Rankings for a given Team
   * @tags Team
   * @name TeamGetRankings
   * @request GET:/teams/{id}/rankings
   * @secure
   */
  export namespace TeamGetRankings {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by the Event in which the Ranking was achieved */
      "event[]"?: number[];
      /** Filter by the Rank */
      "rank[]"?: number[];
      /** Filter by the Season during which the Ranking was */
      "season[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedRanking;
  }

  /**
   * @description Gets a List of Skills runs that a given Team has performed
   * @tags Team
   * @name TeamGetSkills
   * @request GET:/teams/{id}/skills
   * @secure
   */
  export namespace TeamGetSkills {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by the Event at which the Skills run was performed */
      "event[]"?: number[];
      /** Filter by Type of Skills run */
      "type[]"?: TeamGetSkillsParamsTypeEnum[];
      /** Filter by the Season during which the Skills run was performed */
      "season[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedSkill;
  }

  /**
   * @description Gets a List of Awards that a given Team has received
   * @tags Team
   * @name TeamGetAwards
   * @request GET:/teams/{id}/awards
   * @secure
   */
  export namespace TeamGetAwards {
    export type RequestParams = {
      /**
       * The ID of the Team
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by the Event at which the Award was given out */
      "event[]"?: number[];
      /** Filter by the Season in which the Award was given out */
      "season[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedAward;
  }
}

export namespace Programs {
  /**
   * @description Find a single Program by ID
   * @tags Program
   * @name ProgramGetProgram
   * @request GET:/programs/{id}
   * @secure
   */
  export namespace ProgramGetProgram {
    export type RequestParams = {
      /**
       * The Program ID
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Program;
  }

  /**
   * @description Gets a List of Programs
   * @tags Program
   * @name ProgramGetPrograms
   * @request GET:/programs
   * @secure
   */
  export namespace ProgramGetPrograms {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by program ID */
      "id[]"?: number[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedProgram;
  }
}

export namespace Seasons {
  /**
   * @description Gets a List of Seasons
   * @tags Season
   * @name SeasonGetSeasons
   * @request GET:/seasons
   * @secure
   */
  export namespace SeasonGetSeasons {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by Season ID */
      "id[]"?: number[];
      /** Filter by Program to which the Season belongs */
      "program[]"?: number[];
      /** Filter by seasons in which the specified teams were active */
      "team[]"?: number[];
      /**
       * Filter by Start Date of the Season
       * @format date-time
       */
      start?: string;
      /**
       * Filter by End Date of the Season
       * @format date-time
       */
      end?: string;
      /** Only include active Seasons */
      active?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedSeason;
  }

  /**
   * @description Gets a single Season
   * @tags Season
   * @name SeasonGetSeason
   * @request GET:/seasons/{id}
   * @secure
   */
  export namespace SeasonGetSeason {
    export type RequestParams = {
      /**
       * The Season ID
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Season;
  }

  /**
   * @description Gets a List of Events for a given Season
   * @tags Season
   * @name SeasonGetEvents
   * @request GET:/seasons/{id}/events
   * @secure
   */
  export namespace SeasonGetEvents {
    export type RequestParams = {
      /**
       * The Season ID
       * @format int32
       */
      id: number;
    };
    export type RequestQuery = {
      /** Filter by Event SKU */
      "sku[]"?: string[];
      /** Filter by Teams that participated in the Event */
      "team[]"?: number[];
      /**
       * Filter by the Start Date of the Event
       * @format date-time
       */
      start?: string;
      /**
       * Filter by the End Date of the Event
       * @format date-time
       */
      end?: string;
      /** Filter by the Event Level */
      "level[]"?: SeasonGetEventsParamsLevelEnum[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PaginatedEvent;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://www.robotevents.com/api/v2";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title Public Robot Events API
 * @version 1.0.21
 * @baseUrl https://www.robotevents.com/api/v2
 *
 * An API to access data on Robot Events officially.
 * ## Request Metadata
 * Pagination is performed the same way throughout each pageable endpoint using query parameters `page` and `per_page` (per_page default is 25 with a maximum of 250). <br> Please note that dates should be formatted according to RFC3339.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  events = {
    /**
     * @description Gets a List of Events
     *
     * @tags Event
     * @name EventGetEvents
     * @request GET:/events
     * @secure
     */
    eventGetEvents: (
      query?: {
        /** Filter by Event ID */
        "id[]"?: number[];
        /** Filter by Event SKU */
        "sku[]"?: string[];
        /** Filter by Teams that participated in the Event */
        "team[]"?: number[];
        /** Filter by the Season that the Event belonged to */
        "season[]"?: number[];
        /**
         * Filter by the Start Date of the Event
         * @format date-time
         */
        start?: string;
        /**
         * Filter by the End Date of the Event
         * @format date-time
         */
        end?: string;
        /** Filter by the region of the event */
        region?: string;
        /** Filter by the Event Level */
        "level[]"?: EventGetEventsParamsLevelEnum[];
        /**
         * Only show events that have at least one registered team associated with the authenticated user.
         * @default false
         */
        myEvents?: boolean;
        /** Filter by the Event Type */
        "eventTypes[]"?: EventType[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEvent, any>({
        path: `/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a Single Event
     *
     * @tags Event
     * @name EventGetEvent
     * @request GET:/events/{id}
     * @secure
     */
    eventGetEvent: (id: number, params: RequestParams = {}) =>
      this.request<Event, Error>({
        path: `/events/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Teams present at a given Event
     *
     * @tags Event
     * @name EventGetTeams
     * @request GET:/events/{id}/teams
     * @secure
     */
    eventGetTeams: (
      id: number,
      query?: {
        /** Filter by Team Number */
        "number[]"?: string[];
        /** Filter by whether the Team is Registered */
        registered?: boolean;
        /** Filter by the Grade of the Team */
        "grade[]"?: EventGetTeamsParamsGradeEnum[];
        /** Filter by the Country of the Team */
        "country[]"?: string[];
        /**
         * Only show teams associated with the authenticated user.
         * @default false
         */
        myTeams?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedTeam, any>({
        path: `/events/${id}/teams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Skills runs performed at a given Event
     *
     * @tags Event
     * @name EventGetSkills
     * @request GET:/events/{id}/skills
     * @secure
     */
    eventGetSkills: (
      id: number,
      query?: {
        /** Filter by Team Number that performed the Skills run */
        "team[]"?: number[];
        /** Filter by Type of Skills run */
        "type[]"?: EventGetSkillsParamsTypeEnum[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedSkill, any>({
        path: `/events/${id}/skills`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Awards at a given Event
     *
     * @tags Event
     * @name EventGetAwards
     * @request GET:/events/{id}/awards
     * @secure
     */
    eventGetAwards: (
      id: number,
      query?: {
        /** Filter by Team Number that the Award was awarded to */
        "team[]"?: number[];
        /** Filter by the Winner of the Award (can include people's names, etc.) */
        "winner[]"?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedAward, any>({
        path: `/events/${id}/awards`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Matches for a single Division of an Event
     *
     * @tags Event
     * @name EventGetDivisionMatches
     * @request GET:/events/{id}/divisions/{div}/matches
     * @secure
     */
    eventGetDivisionMatches: (
      id: number,
      div: number,
      query?: {
        /** Filter to only return Matches which involved given Teams */
        "team[]"?: number[];
        /**
         * Filter by the Round of the Match.
         * Some typical values are shown below:
         * - 1 - Practice
         * - 2 - Qualification
         * - 3 - Quarter-Finals
         * - 4 - Semi-Finals
         * - 5 - Finals
         * - 6 - Round of 16
         * - etc.
         */
        "round[]"?: number[];
        /** Filter by the Instance of the Match. This is used to describe which Quarter-Final match (for example) is being played */
        "instance[]"?: number[];
        /** Filter by the MatchNum of the Match. This is the actual Match "number", e.g. Qualification Match, or the individual match in a Best of 3 */
        "matchnum[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedMatch, any>({
        path: `/events/${id}/divisions/${div}/matches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Finalist Rankings for a single Division of an Event
     *
     * @tags Event
     * @name EventGetDivisionFinalistRankings
     * @request GET:/events/{id}/divisions/{div}/finalistRankings
     * @secure
     */
    eventGetDivisionFinalistRankings: (
      id: number,
      div: number,
      query?: {
        /** Filter to only return Rankings which involve given Teams */
        "team[]"?: number[];
        /** Filter by the Rank */
        "rank[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedRanking, any>({
        path: `/events/${id}/divisions/${div}/finalistRankings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Rankings for a single Division of an Event
     *
     * @tags Event
     * @name EventGetDivisionRankings
     * @request GET:/events/{id}/divisions/{div}/rankings
     * @secure
     */
    eventGetDivisionRankings: (
      id: number,
      div: number,
      query?: {
        /** Filter to only return Rankings which involve given Teams */
        "team[]"?: number[];
        /** Filter by the Rank */
        "rank[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedRanking, any>({
        path: `/events/${id}/divisions/${div}/rankings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  teams = {
    /**
     * @description Gets a List of Teams
     *
     * @tags Team
     * @name TeamGetTeams
     * @request GET:/teams
     * @secure
     */
    teamGetTeams: (
      query?: {
        /** Filter by Team ID */
        "id[]"?: number[];
        /** Filter by Team Number */
        "number[]"?: string[];
        /** Filter by Events that Teams have attended */
        "event[]"?: number[];
        /** Filter by whether or not the Team is Registered */
        registered?: boolean;
        /** Filter by the Program that the Team is part of */
        "program[]"?: number[];
        /** Filter by the Grade of the Team */
        "grade[]"?: TeamGetTeamsParamsGradeEnum[];
        /** Filter by the Country of the Team */
        "country[]"?: string[];
        /**
         * Only show teams associated with the authenticated user.
         * @default false
         */
        myTeams?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedTeam, any>({
        path: `/teams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a Single Team
     *
     * @tags Team
     * @name TeamGetTeam
     * @request GET:/teams/{id}
     * @secure
     */
    teamGetTeam: (id: number, params: RequestParams = {}) =>
      this.request<Team, Error>({
        path: `/teams/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Events that a given Team has attended
     *
     * @tags Team
     * @name TeamGetEvents
     * @request GET:/teams/{id}/events
     * @secure
     */
    teamGetEvents: (
      id: number,
      query?: {
        /** Filter by Event SKU */
        "sku[]"?: string[];
        /** Filter by the Season that the Event belonged to */
        "season[]"?: number[];
        /**
         * Filter by the Start Date of the Event
         * @format date-time
         */
        start?: string;
        /**
         * Filter by the End Date of the Event
         * @format date-time
         */
        end?: string;
        /** Filter by the Event Level */
        "level[]"?: TeamGetEventsParamsLevelEnum[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEvent, any>({
        path: `/teams/${id}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Matches that a given Team has played in
     *
     * @tags Team
     * @name TeamGetMatches
     * @request GET:/teams/{id}/matches
     * @secure
     */
    teamGetMatches: (
      id: number,
      query?: {
        /** Filter by the Event the Match was performed at */
        "event[]"?: number[];
        /** Filter by the Season during which the Match was played */
        "season[]"?: number[];
        /**
         * Filter by the Round of the Match.
         * Some typical values are shown below:
         * - 1 - Practice
         * - 2 - Qualification
         * - 3 - Quarter-Finals
         * - 4 - Semi-Finals
         * - 5 - Finals
         * - 6 - Round of 16
         * - etc.
         */
        "round[]"?: number[];
        /** Filter by the Instance of the Match. This is used to describe which Quarter-Final match (for example) is being played */
        "instance[]"?: number[];
        /** Filter by the MatchNum of the Match. This is the actual Match "number", e.g. Qualification Match, or the individual match in a Best of 3 */
        "matchnum[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedMatch, any>({
        path: `/teams/${id}/matches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Rankings for a given Team
     *
     * @tags Team
     * @name TeamGetRankings
     * @request GET:/teams/{id}/rankings
     * @secure
     */
    teamGetRankings: (
      id: number,
      query?: {
        /** Filter by the Event in which the Ranking was achieved */
        "event[]"?: number[];
        /** Filter by the Rank */
        "rank[]"?: number[];
        /** Filter by the Season during which the Ranking was */
        "season[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedRanking, any>({
        path: `/teams/${id}/rankings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Skills runs that a given Team has performed
     *
     * @tags Team
     * @name TeamGetSkills
     * @request GET:/teams/{id}/skills
     * @secure
     */
    teamGetSkills: (
      id: number,
      query?: {
        /** Filter by the Event at which the Skills run was performed */
        "event[]"?: number[];
        /** Filter by Type of Skills run */
        "type[]"?: TeamGetSkillsParamsTypeEnum[];
        /** Filter by the Season during which the Skills run was performed */
        "season[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedSkill, any>({
        path: `/teams/${id}/skills`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Awards that a given Team has received
     *
     * @tags Team
     * @name TeamGetAwards
     * @request GET:/teams/{id}/awards
     * @secure
     */
    teamGetAwards: (
      id: number,
      query?: {
        /** Filter by the Event at which the Award was given out */
        "event[]"?: number[];
        /** Filter by the Season in which the Award was given out */
        "season[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedAward, any>({
        path: `/teams/${id}/awards`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  programs = {
    /**
     * @description Find a single Program by ID
     *
     * @tags Program
     * @name ProgramGetProgram
     * @request GET:/programs/{id}
     * @secure
     */
    programGetProgram: (id: number, params: RequestParams = {}) =>
      this.request<Program, any>({
        path: `/programs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Programs
     *
     * @tags Program
     * @name ProgramGetPrograms
     * @request GET:/programs
     * @secure
     */
    programGetPrograms: (
      query?: {
        /** Filter by program ID */
        "id[]"?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedProgram, any>({
        path: `/programs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  seasons = {
    /**
     * @description Gets a List of Seasons
     *
     * @tags Season
     * @name SeasonGetSeasons
     * @request GET:/seasons
     * @secure
     */
    seasonGetSeasons: (
      query?: {
        /** Filter by Season ID */
        "id[]"?: number[];
        /** Filter by Program to which the Season belongs */
        "program[]"?: number[];
        /** Filter by seasons in which the specified teams were active */
        "team[]"?: number[];
        /**
         * Filter by Start Date of the Season
         * @format date-time
         */
        start?: string;
        /**
         * Filter by End Date of the Season
         * @format date-time
         */
        end?: string;
        /** Only include active Seasons */
        active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedSeason, any>({
        path: `/seasons`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a single Season
     *
     * @tags Season
     * @name SeasonGetSeason
     * @request GET:/seasons/{id}
     * @secure
     */
    seasonGetSeason: (id: number, params: RequestParams = {}) =>
      this.request<Season, any>({
        path: `/seasons/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a List of Events for a given Season
     *
     * @tags Season
     * @name SeasonGetEvents
     * @request GET:/seasons/{id}/events
     * @secure
     */
    seasonGetEvents: (
      id: number,
      query?: {
        /** Filter by Event SKU */
        "sku[]"?: string[];
        /** Filter by Teams that participated in the Event */
        "team[]"?: number[];
        /**
         * Filter by the Start Date of the Event
         * @format date-time
         */
        start?: string;
        /**
         * Filter by the End Date of the Event
         * @format date-time
         */
        end?: string;
        /** Filter by the Event Level */
        "level[]"?: SeasonGetEventsParamsLevelEnum[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedEvent, any>({
        path: `/seasons/${id}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
