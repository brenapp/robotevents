import { IdInfo } from ".";
export declare type SkillsType = "driver" | "programming" | "package_delivery_time";
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
export interface SkillOptionsFromEvent {
    team?: number[];
    type?: SkillsType[];
}
export interface SkillOptionsFromTeam {
    event?: number[];
    type?: SkillsType[];
    season?: number[];
}
