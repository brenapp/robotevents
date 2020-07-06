import { IdInfo } from ".";

export type SkillsType = "driver" | "programming" | "package_delivery_time";

export interface Skill {
  id: number;

  // The event the skills run is associated with
  event: IdInfo;

  // The team who run then skills run
  team: IdInfo;

  // The type of skills run performed
  type: SkillsType;

  // The season where the run took place
  season: IdInfo;

  // The rank at the local event
  rank: number;

  // The final calculated score
  score: number;

  // The number of attempts of the same type by the same team at the event
  attempts: number;
}

export interface SkillOptionsFromEvent {
  // Filter by the team that performed the run (team ID numbers)
  team?: number[];

  // Filter by run type
  type?: SkillsType[];
}

export interface SkillOptionsFromTeam {
  // Filter the event IDs the run took place at
  event?: number[];

  // Filter by type of run
  type?: SkillsType[];

  // Filter by the season in which the run took place
  season?: number[];
}
