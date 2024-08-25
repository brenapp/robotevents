import { operations } from "../generated/shim.js";
import { Client, transformResponse } from "../utils/client.js";
import { seasons } from "../types.js";
import { Event } from "../wrappers/Event.js";

export function seasonsEndpoint(client: Client) {
  return {
    ...seasons,

    /**
     * Get details about a season
     * @param id Season ID
     * @returns Details about the season
     */
    async get(id: number, options?: Omit<RequestInit, "body" | "headers">) {
      return client.GET("/seasons/{id}", {
        params: { path: { id } },
        ...options,
      });
    },

    /**
     * Get a list of seasons
     * @param options Query Params
     * @returns List of seasons
     */
    async all(
      query: operations["season_getSeasons"]["parameters"]["query"],
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return client.PaginatedGET("/seasons", { params: { query }, ...options });
    },

    /**
     * Get events for a season
     * @param id Season ID
     * @returns List of events
     **/
    async events(
      id: number,
      query: operations["season_getEvents"]["parameters"]["query"],
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return transformResponse(
        client.PaginatedGET("/seasons/{id}/events", {
          params: { path: { id }, query },
          ...options,
        }),
        (data) => data.map((event) => new Event(event, client))
      );
    },
  };
}
