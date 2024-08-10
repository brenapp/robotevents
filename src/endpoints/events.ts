import { Events } from "../generated/robotevents.js";
import { EndpointOptions } from "../types.js";
import { Event } from "../wrappers/Event.js";

export function createEventsEndpoint(api: EndpointOptions) {
  return {
    async search(options: Events.EventGetEvents.RequestQuery) {
      const response = await api.paginatedFetch<
        Events.EventGetEvents.ResponseBody,
        Events.EventGetEvents.RequestQuery
      >("/events", options);

      return response.success
        ? (response.data?.map((data) => new Event(data, api)) ?? [])
        : [];
    },

    async get(id: number) {
      const response = await api.fetch<
        Events.EventGetEvent.ResponseBody,
        Events.EventGetEvent.RequestQuery
      >(`/events/${id}`);

      return response.success ? new Event(response.data, api) : null;
    },
  };
}
