import { IdInfo } from ".";

export type SkillsType = "driver" | "programming" | "package_delivery_time";

export interface Skill {
  id: number;
  event: IdInfo;
  team: IdInfo;
  type: SkillsType;
  season: IdInfo;
  rank: number;
  score: number;
  attempts: number;
}

export interface SkillsOptionsFromEvent {
  team?: number[];
  type?: SkillsType[];
}
