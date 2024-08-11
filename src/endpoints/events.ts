import { Events } from "../generated/robotevents.js";
import { EndpointOptions, FetcherResponse } from "../types.js";
import { Event } from "../wrappers/Event.js";

export function createEventsEndpoint(api: EndpointOptions) {
  return {
    async search(
      options: Events.EventGetEvents.RequestQuery
    ): Promise<FetcherResponse<Event[]>> {
      const response = await api.paginatedFetch<
        Events.EventGetEvents.ResponseBody,
        Events.EventGetEvents.RequestQuery
      >("/events", options);

      if (!response.success) {
        return response;
      }

      const data = response.data?.map((data) => new Event(data, api)) ?? [];
      return { success: true, data };
    },

    async getBySKU(sku: string): Promise<FetcherResponse<Event | null>> {
      const response = await api.paginatedFetch<
        Events.EventGetEvents.ResponseBody,
        Events.EventGetEvents.RequestQuery
      >("/events", { "sku[]": [sku] });

      if (!response.success) {
        return response;
      }

      const event = response.data?.[0];
      return { success: true, data: event ? new Event(event, api) : null };
    },

    async get(id: number): Promise<FetcherResponse<Event | null>> {
      const response = await api.fetch<
        Events.EventGetEvent.ResponseBody,
        Events.EventGetEvent.RequestQuery
      >(`/events/${id}`);

      if (!response.success) {
        return response;
      }

      return { success: true, data: new Event(response.data, api) };
    },
  };
}
