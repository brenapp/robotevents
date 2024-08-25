import { paths, components, operations } from "./robotevents.js";
export { paths, operations };

export type Event = components["schemas"]["Event"];
export type EventType = components["schemas"]["EventType"];
export type Program = components["schemas"]["Program"];
export type IdInfo = components["schemas"]["IdInfo"];
export type EventLevel = components["schemas"]["EventLevel"];
export type Location = components["schemas"]["Location"];
export type Coordinates = components["schemas"]["Coordinates"];
export type Locations = components["schemas"]["Locations"];
export type Division = components["schemas"]["Division"];
export type Grade = components["schemas"]["Grade"];
export type Team = components["schemas"]["Team"];
export type MatchObj = components["schemas"]["MatchObj"];
export type Alliance = components["schemas"]["Alliance"];
export type AllianceTeam = components["schemas"]["AllianceTeam"];
export type Ranking = components["schemas"]["Ranking"];
export type Skill = components["schemas"]["Skill"];
export type SkillType = components["schemas"]["SkillType"];
export type Award = components["schemas"]["Award"];
export type TeamAwardWinner = components["schemas"]["TeamAwardWinner"];
export type Season = components["schemas"]["Season"];
export type Error = components["schemas"]["Error"];

export type PageMeta = components["schemas"]["PageMeta"];
export type Paginated<T> = {
  meta?: PageMeta;
  data?: T[];
};
export type PaginatedTeam = Paginated<Team>;
export type PaginatedEvent = Paginated<Event>;
export type PaginatedAward = Paginated<Award>;
export type PaginatedSeason = Paginated<Season>;
export type PaginatedRanking = Paginated<Ranking>;
export type PaginatedMatch = Paginated<MatchObj>;
export type PaginatedSkill = Paginated<Skill>;
export type PaginatedProgram = Paginated<Program>;
