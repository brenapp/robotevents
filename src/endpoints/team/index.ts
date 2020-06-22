import { IdInfo } from "..";

export type Grade =
  | "College"
  | "High School"
  | "Middle School"
  | "Elementary School";

export interface TeamData {
  id: number;

  number: string;
  team_name: string;
  robot_name: string;
  organization: string;

  location: {
    venue: string | null;
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

  registered: boolean;
  program: IdInfo;
  grade: Grade;
}

export interface TeamOptionsFromEvent {
  number?: string;
  registered?: boolean;
  grade?: Grade[];
  country?: string[];
}

export default class Team implements TeamData {
  // Team Data
  id = 0;

  number = "";
  team_name = "";
  robot_name = "";
  organization = "";

  location = {
    venue: null,
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

  registered = false;
  program = { id: 0, name: "", code: null };
  grade = "High School" as Grade;

  constructor(data: TeamData) {
    for (const [key, value] of Object.entries(data)) {
      // @ts-ignore
      this[key] = value;
    }
  }
}
