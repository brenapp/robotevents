/**
 * Program Management
 *
 * Most of the time, people will not need to actually go to network for this API (the options are present if you do need to however)
 * Instead they will probably rely on the default export, which returns IDs from abbreviations
 *
 */
import request from "../../util/request";

export interface Program {
  id: number;
  abbr: string;
  name: string;
}

// Actual API access
export async function fetch(id: number) {
  const programs = await request<Program>("programs", {
    id,
  });

  if (programs.length < 1) {
    return Promise.reject(new Error(`No program with id ${id}`));
  }

  return programs[0];
}

export async function all() {
  return request<Program>("programs", {});
}

export type ProgramAbbr =
  | "VRC"
  | "VEXU"
  | "WORKSHOP"
  | "CREATE"
  | "VIQC"
  | "DIS"
  | "NRL"
  | "RAD"
  | "TVCR"
  | "TIQC"
  | "VAIC-HS"
  | "VAIC-U";

const programs: { [T in ProgramAbbr]: number } = {
  VRC: 1,
  VEXU: 4,
  WORKSHOP: 37,
  CREATE: 40,
  VIQC: 41,
  DIS: 42,
  NRL: 43,
  RAD: 44,
  TVCR: 46,
  TIQC: 47,
  "VAIC-HS": 48,
  "VAIC-U": 49,
};

export function get(abbr: ProgramAbbr) {
  return programs[abbr] ?? 0;
}

export default get;
