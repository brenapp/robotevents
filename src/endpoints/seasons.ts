import {
  EndpointOptions,
  ProgramCode,
  programs,
  seasons,
  Year,
} from "../types.js";
import { Seasons } from "../generated/robotevents.js";

export function createSeasonsEndpoints({
  fetch,
  paginatedFetch,
}: EndpointOptions) {
  return {
    ...seasons,
    async get(id: number) {
      return fetch<
        Seasons.SeasonGetSeason.ResponseBody,
        Seasons.SeasonGetSeason.RequestQuery
      >(`/seasons/${id}`);
    },

    current(program: ProgramCode, year: Year = "2024-2025") {
      return seasons[program][year];
    },

    async all(options?: Seasons.SeasonGetSeasons.RequestQuery) {
      return paginatedFetch<
        Seasons.SeasonGetSeasons.ResponseBody,
        Seasons.SeasonGetSeasons.RequestQuery
      >("/seasons", options ?? {});
    },
    async events(id: number, options?: Seasons.SeasonGetEvents.RequestQuery) {
      return paginatedFetch<
        Seasons.SeasonGetEvents.ResponseBody,
        Seasons.SeasonGetEvents.RequestQuery
      >(`/seasons/${id}/events`, options ?? {});
    },
  };
}
