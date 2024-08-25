import { operations } from "../generated/shim.js";
import { Client, transformResponse } from "../utils/client.js";
import { Event } from "../wrappers/Event.js";

export function eventsEndpoint(client: Client) {
  return {
    /**
     * Get a list of events
     * @param query Event Search Options
     * @param options Request Options, passed to fetch
     * @returns Paginated List of Events
     */
    async search(
      query: operations["event_getEvents"]["parameters"]["query"],
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return client.PaginatedGET("/events", { query, ...options });
    },

    /**
     * Get an event by ID
     * @param id Event ID (not SKU)
     * @returns Event
     */
    async get(id: number, options?: Omit<RequestInit, "body" | "headers">) {
      return transformResponse(
        client.GET("/events/{id}", {
          params: { path: { id } },
          ...options,
        }),
        (data) => new Event(data, client)
      );
    },

    /**
     * Get an event by SKU
     * @param id Event SKU
     * @returns Event
     */
    async getBySKU(
      sku: string,
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return transformResponse(
        client.GET("/events", {
          params: { query: { "sku[]": [sku] } },
          ...options,
        }),
        (data) => {
          const event = data.data?.[0];
          return event ? new Event(event, client) : null;
        }
      );
    },
  };
}
