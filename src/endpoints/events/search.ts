/**
 * Searching/Filtering events
 */

import request from "../../util/request";
import { EventData, Event } from ".";

export type Level =
  | "World"
  | "National"
  | "State"
  | "Signature"
  | "Regional"
  | "Other";

export type EventType = "tournament" | "league" | "workshop" | "virtual";

export interface EventSearchOptions {
  id?: number[];
  sku?: string[];
  team?: number[];
  season?: number[];
  start?: string;
  end?: string;
  region?: string;
  level?: Level[];
  myEvents?: boolean;
  eventTypes?: EventType[];
}

/**
 * Searches for events using the specified options, returns an array of matching Events
 *
 * @example
 * const TowerTakeoverVRC = robotevents.seasons.get("VRC", "2019-2020");
 * const events = await robotevents.events.search({ level: ["State", "National", "Signature"], season: [TowerTakeoverVRC] });
 *
 * for (const event of events) {
 *  console.log(event.name);
 * }
 *
 * @param options Search options (events must meet all criteria, and arrays specify multiple possible options)
 * @param maxAge Maximum allowable age when using a cached value. If not
 * specified, any suitable record from the cache may be used
 */
export default async function search(
  options: EventSearchOptions,
  maxAge?: number
) {
  const results = await request<EventData>("events", options, maxAge);
  return results.map((data) => new Event(data));
}
