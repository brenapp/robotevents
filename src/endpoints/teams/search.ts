/**
 * Searching for/filtering teams
 */

import { Team, Grade, TeamData } from ".";
import request from "../../util/request";

interface SearchOptions {
  id?: number[];
  number?: string[];
  event?: number[];
  registered?: boolean;
  program?: number[];
  grade?: Grade[];
  country?: string;
}

export function search(options: SearchOptions = {}, maxAge?: number) {
  return request<TeamData>(`teams`, options, maxAge).then((response) =>
    response.map((data) => new Team(data))
  );
}
