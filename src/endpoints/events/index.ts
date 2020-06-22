/**
 * A single event
 */

import search, { Level } from "./search";
import request from "../../request";
import { EventEmitter } from "events";

export interface EventData {
  id: number;
  sku: string;
  name: string;
  start: string;
  end: string;

  season: {
    id: number;
    name: string;
    code: string | null;
  };

  program: {
    id: number;
    name: string;
    code: string;
  };

  location: {
    venue: string;
    address_1: string | null;
    address_2: string | null;
    city: string | null;
    region: string | null;
    postcode: string | null;
    country: string | null;
    coordinates: {
      lat: string;
      lon: string;
    };
  };

  divisions: {
    id: number;
    name: string;
    order: number;
  }[];

  level: Level;
  ongoing: boolean;
  awards_finalized: boolean;
}

export class Event implements EventData {
  id = 0;
  sku = "";
  name = "";
  start = "";
  end = "";

  season = {
    id: 0,
    name: "",
    code: null,
  };

  program = {
    id: 0,
    name: "",
    code: "",
  };

  location = {
    venue: "",
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    postcode: null,
    country: null,
    coordinates: {
      lat: "",
      lon: "",
    },
  };

  divisions = [];

  level = "Other" as Level;
  ongoing = false;
  awards_finalized = false;

  // Loads the event with the ID
  constructor(data: EventData) {
    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
  }
}

export default async function get(sku: string) {
  const events = await search({ sku: [sku] });

  if (events.length < 1) {
    return Promise.reject(new Error(`No event with SKU ${sku}`));
  }

  return new Event(events[0]);
}