/**
 * Searching for/filtering teams
 */

import { Team, Grade, TeamData } from ".";
import request from "../../util/request";

export interface TeamSearchOptions {
  id?: number[];
  number?: string[];
  event?: number[];
  registered?: boolean;
  program?: number[];
  grade?: Grade[];
  country?: string;
}

/**
 * Searches for teams using the specified criteria
 * @param options Team search options
 * @param maxAge Maximum allowable age when using a cached value. If not
 * specified, any suitable record from the cache may be used
 */
export function search(options: TeamSearchOptions = {}, maxAge?: number) {
  return request<TeamData>(`teams`, options, maxAge).then((response) =>
    response.map((data) => new Team(data))
  );
}
