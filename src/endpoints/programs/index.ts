/**
 * Program Management
 *
 * Most of the time, people will not need to actually go to network for this API (the options are present if you do need to however)
 * Instead they will probably rely on the default export, which returns IDs from abbreviations
 *
 */
import request, { requestSingle } from "../../util/request";

export interface Program {
  id: number;
  abbr: ProgramAbbr;
  name: string;
}

/**
 * Fetches information about a program from RobotEvents. This is most useful to
 * receive the name or the RECF abbreviation of the program, but shouldn't be
 * used in typical applications.
 *
 * @example
 * const VRC = await robotevents.programs.fetch(1);
 * console.log(VRC);
 *
 * @param id The program ID, see `robotevents.programs.fetch()`
 * @param maxAge Maximum allowable age when using a cached value. If not
 * specified, any suitable record from the cache may be used
 */
export async function fetch(id: number, maxAge?: number) {
  return requestSingle<Program>(`programs/${id}`, {}, maxAge);
}

/**
 * Fetches all created programs. This method shouldn't be used in typical applications.
 *
 * @example
 * const programs = await robotevents.programs.all();
 *
 * for (const program of programs) {
 *  console.log(program.name)
 * }
 *
 * @param maxAge Maximum allowable age when using a cached value. If not
 * specified, any suitable record from the cache may be used
 */
export async function all(maxAge?: number) {
  return request<Program>("programs", {}, maxAge);
}


const programs = {
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

/**
 * Gets the ID of a program given its common abbreviation. Returns 0 if no
 * program has that abbreviation. This is the standard way to refer to programs
 *
 * @example
 * const VRC = robotevents.progams.get("VRC");
 *
 * @param abbr Program Abbreviation ("VRC" "VEXU" "VIQC" etc)
 */
export function get(abbr: ProgramAbbr) {
  return programs[abbr] ?? 0;
}
