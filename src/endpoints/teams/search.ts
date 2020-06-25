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

export function search(options: TeamSearchOptions = {}, maxAge?: number) {
  return request<TeamData>(`teams`, options, maxAge).then((response) =>
    response.map((data) => new Team(data))
  );
}
