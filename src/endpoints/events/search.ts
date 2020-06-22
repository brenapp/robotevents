/**
 * Searching/Filtering events
 */

import request from "../../util/request";
import { EventData } from ".";

export type Level =
  | "World"
  | "National"
  | "State"
  | "Signature"
  | "Regional"
  | "Other";

export interface SearchOptions {
  id?: number[];
  sku?: string[];
  team?: number[];
  season?: number[];
  start?: string;
  end?: string;
  level?: Level[];
}

export default async function search(options: SearchOptions) {
  return request<EventData>("events", options);
}
