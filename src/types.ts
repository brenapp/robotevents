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

export { Round } from "./wrappers/Match.js";

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

export const years = [
  "2024-2025",
  "2023-2024",
  "2022-2023",
  "2021-2022",
  "2020-2021",
  "2019-2020",
  "2018-2019",
  "2017-2018",
  "2016-2017",
  "2015-2016",
  "2014-2015",
  "2013-2014",
  "2012-2013",
  "2011-2012",
  "2010-2011",
  "2009-2010",
] as const;

export type Year = (typeof years)[number];

export const seasons: {
  [P in ProgramCode]: {
    [Y in Year]?: number;
  };
} = {
  [programs.V5RC]: {
    "2024-2025": 190,
    "2023-2024": 181,
    "2022-2023": 173,
    "2021-2022": 154,
    "2020-2021": 139,
    "2019-2020": 130,
    "2018-2019": 125,
    "2017-2018": 119,
    "2016-2017": 115,
    "2015-2016": 110,
    "2014-2015": 102,
    "2013-2014": 92,
    "2012-2013": 85,
    "2011-2012": 73,
    "2010-2011": 7,
    "2009-2010": 1,
  },
  [programs.VURC]: {
    "2024-2025": 191,
    "2023-2024": 182,
    "2022-2023": 175,
    "2021-2022": 156,
    "2020-2021": 140,
    "2019-2020": 131,
    "2018-2019": 126,
    "2017-2018": 120,
    "2016-2017": 116,
    "2015-2016": 111,
    "2014-2015": 103,
    "2013-2014": 93,
    "2012-2013": 88,
    "2011-2012": 76,
    "2010-2011": 10,
    "2009-2010": 4,
  },
  [programs.VAIRC]: {
    "2023-2024": 185,
    "2021-2022": 171,
  },
  [programs.WORKSHOP]: {
    "2023-2024": 118,
    "2015-2016": 113,
    "2014-2015": 107,
    "2013-2014": 98,
  },
  [programs.VIQRC]: {
    "2024-2025": 189,
    "2023-2024": 180,
    "2022-2023": 174,
    "2021-2022": 155,
    "2020-2021": 138,
    "2019-2020": 129,
    "2018-2019": 124,
    "2017-2018": 121,
    "2016-2017": 114,
    "2015-2016": 109,
    "2014-2015": 101,
    "2013-2014": 96,
  },
  [programs.NRL]: {
    "2019-2020": 137,
  },
  [programs.ADC]: {
    "2024-2025": 192,
    "2023-2024": 184,
    "2022-2023": 176,
    "2021-2022": 158,
    "2020-2021": 144,
    "2019-2020": 134,
  },
  [programs.TVRC]: {
    "2023-2024": 187,
    "2022-2023": 179,
    "2021-2022": 167,
    "2020-2021": 142,
    "2019-2020": 136,
  },
  [programs.TVIQRC]: {
    "2023-2024": 186,
    "2022-2023": 178,
    "2021-2022": 166,
    "2020-2021": 141,
    "2019-2020": 135,
  },
  [programs.VRAD]: {},
  [programs.BellAVR]: {},
  [programs.FAC]: {
    "2023-2024": 188,
    "2022-2023": 177,
    "2021-2022": 165,
  },
};

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
