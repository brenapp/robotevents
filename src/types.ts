import { PageMeta } from "./generated/robotevents.js";

export type {
  Event as EventData,
  EventType,
  Program,
  EventLevel,
  Location,
  Coordinates,
  Locations,
  Division,
  Grade,
  Team as TeamData,
  MatchObj as MatchData,
  Alliance,
  AllianceTeam,
  Ranking,
  Skill,
  SkillType,
  Award,
  TeamAwardWinner,
  Season,
  Error,
  AllianceColorEnum as Color,
  AwardDesignationEnum as AwardDesignation,
  AwardClassificationEnum as AwardClassificationEnum,
} from "./generated/robotevents.js";

export type {
  Events as EventsEndpoints,
  Teams as TeamsEndpoints,
  Programs as ProgramsEndpoints,
  Seasons as SeasonsEndpoints,
} from "./generated/robotevents.js";

export type { Round } from "./wrappers/Match.js";

export const programs = {
  V5RC: 1,
  VURC: 4,
  WORKSHOP: 37,
  VIQRC: 41,
  NRL: 43,
  ADC: 44,
  TVRC: 46,
  TVIQRC: 47,
  VRAD: 51,
  BellAVR: 55,
  FAC: 56,
  VAIRC: 57,
} as const;

export type ProgramAbbr = keyof typeof programs;
export type ProgramCode = (typeof programs)[ProgramAbbr];

export type WithRequiredId<T> = T extends { id?: unknown }
  ? Omit<T, "id"> & Required<Pick<T, "id">>
  : T;

export type IdInfo<T> = {
  id: number;
  name: string;
  code?: T | null;
};

export type ClientOptions = {
  authorization: {
    token: string;
  };
  request?: {
    customFetch?: typeof fetch;
    baseURL?: string;
    baseRequest?: RequestInit;
  };
};

export type SuccessfulResponse<T> = {
  success: true;
  data: T;
};

export type FailedResponse = {
  success: false;
  error: unknown;
};

export type FetcherQueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[]
>;

export type FetcherResponse<T> = SuccessfulResponse<T> | FailedResponse;

export type Fetcher = <T, Q extends FetcherQueryParams>(
  endpoint: string,
  query?: Q,
  options?: RequestInit
) => Promise<FetcherResponse<WithRequiredId<T>>>;

export type PaginatedData<T> = {
  meta?: PageMeta;
  data?: T[];
};

export type PaginatedFetch = <
  T extends PaginatedData<unknown>,
  Q extends FetcherQueryParams,
>(
  endpoint: string,
  query?: Q,
  options?: RequestInit
) => Promise<FetcherResponse<T["data"]>>;

export type EndpointOptions = {
  fetch: Fetcher;
  paginatedFetch: PaginatedFetch;
};
