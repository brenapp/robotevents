import { EndpointOptions, Event, Season } from "../types.js";

export function createSeasonsEndpoints({ fetch }: EndpointOptions) {
  return {
    async get(id: number) {
      return fetch<Season>(`/seasons/${id}`);
    },
    async all() {
      return fetch<Season[]>("/seasons");
    },
    async events(id: number) {
      return fetch<Event[]>(`/seasons/${id}/events`);
    },
  };
}
