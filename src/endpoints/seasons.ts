import { EndpointOptions, Event, Season } from "../types.js";
import { Seasons } from "../generated/robotevents.js";

export function createSeasonsEndpoints({
  fetch,
  paginatedFetch,
}: EndpointOptions) {
  return {
    async get(id: number) {
      return fetch<
        Seasons.SeasonGetSeason.ResponseBody,
        Seasons.SeasonGetSeason.RequestQuery
      >(`/seasons/${id}`);
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
