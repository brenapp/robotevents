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

export interface EventSearchOptions {
  id?: number[];
  sku?: string[];
  team?: number[];
  season?: number[];
  start?: string;
  end?: string;
  level?: Level[];
}

export default async function search(
  options: EventSearchOptions,
  maxAge?: number
) {
  return request<EventData>("events", options, maxAge).then((results) =>
    results.map((data) => new Event(data))
  );
}
