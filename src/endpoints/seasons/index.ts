/**
 * Season Management in RobotEvents
 */

import { ProgramAbbr } from "../programs";
import request from "../../util/request";

export interface Season {
  id: number;
  name: string;
  program: {
    id: number;
    name: string;
    code: string;
  };
  start: string;
  end: string;
  years_start: number;
  years_end: number;
}

export async function fetch(id: number) {
  const seasons = await request<Season>("seasons", {
    id,
  });

  if (seasons.length < 1) {
    return Promise.reject(new Error(`No season with id ${id}`));
  }

  return seasons[0];
}

export async function all() {
  return request<Season>("seasons", {});
}

export type Year =
  | "2020-2021"
  | "2019-2020"
  | "2018-2019"
  | "2017-2018"
  | "2016-2017"
  | "2015-2016"
  | "2014-2015"
  | "2013-2014"
  | "2012-2013"
  | "2011-2012"
  | "2010-2011"
  | "2009-2010";

export const years: Year[] = [
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
];

// All of the season IDs
const seasons: {
  [P in ProgramAbbr]: {
    [Y in Year]?: number;
  };
} = {
  "VAIC-HS": {
    "2020-2021": 145,
  },
  "VAIC-U": {
    "2020-2021": 147,
  },
  CREATE: {
    "2020-2021": 146,
    "2019-2020": 132,
    "2018-2019": 127,
    "2017-2018": 122,
    "2016-2017": 117,
    "2015-2016": 112,
    "2014-2015": 104,
    "2013-2014": 94,
    "2012-2013": 91,
    "2011-2012": 79,
  },
  WORKSHOP: {
    "2020-2021": 118,
    "2019-2020": 113,
    "2018-2019": 107,
    "2017-2018": 98,
  },
  VIQC: {
    "2020-2021": 138,
    "2019-2020": 129,
    "2018-2019": 124,
    "2017-2018": 121,
    "2016-2017": 114,
    "2015-2016": 109,
    "2014-2015": 101,
    "2013-2014": 96,
  },
  VRC: {
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
  VEXU: {
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
  DIS: {
    "2020-2021": 143,
    "2019-2020": 133,
    "2018-2019": 128,
  },
  NRL: {
    "2019-2020": 137,
  },
  RAD: {
    "2020-2021": 144,
    "2019-2020": 134,
  },
  TVCR: {
    "2020-2021": 142,
    "2019-2020": 136,
  },
  TIQC: {
    "2020-2021": 141,
    "2019-2020": 135,
  },
};

/**
 * Gets the Season ID for a given program and year
 * @param program Program
 * @param year Year
 */
export function get(program: ProgramAbbr, year: Year) {
  return seasons[program][year];
}

/**
 * Gets the current season for the given  program
 * @param program Program
 */
export function current(program: ProgramAbbr) {
  return seasons[program]["2020-2021"];
}
