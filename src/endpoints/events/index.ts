/**
 * A single event
 */

import search, { Level } from "./search";
import request from "../../util/request";
import WatchableCollection from "../../WatchableCollection";
import { Award, AwardOptionsFromEvent } from "../award";
import { MatchOptionsFromEvent, Match } from "../matches";

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

  // Load the event
  constructor(data: EventData) {
    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
  }

  // Watchable Collections

  /**
   * Gets the awards for the event, returns a watchable collection
   * @param options Award Search Options
   */
  awards(options: AwardOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Award>(`events/${this.id}/awards`, options, true)
    );
  }

  /**
   * Gets the matches for an event, returns a watchable collection
   * @param division Division ID
   * @param options Match Search Options
   */
  matches(division: number, options: MatchOptionsFromEvent = {}) {
    return WatchableCollection.create(() =>
      request<Match>(
        `events/${this.id}/divisions/${division}/matches`,
        options,
        true
      )
    );
  }

  rankings(division: number) {}
}

export default async function get(skuOrID: string | number) {
  const events: EventData[] = [];

  if (typeof skuOrID == "string") {
    events.push(...(await search({ sku: [skuOrID] })));
  } else if (typeof skuOrID) {
    events.push(...(await search({ id: [skuOrID] })));
  }

  if (events.length < 1) {
    return Promise.reject(new Error(`No event with SKU/ID ${skuOrID}`));
  }

  return new Event(events[0]);
}
