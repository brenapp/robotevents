/**
 * Season Management in RobotEvents
 */
import { ProgramAbbr } from "../programs";
import { Event } from "../events";
import { Level } from "../events/search";
export interface Season {
    id: number;
    name: string;
    program: {
        id: number;
        name: string;
        code: string;
    };
    start: string;
    end: string;
    years_start: number;
    years_end: number;
}
export declare function fetch(id: number): Promise<Season>;
export declare function all(): Promise<Season[]>;
export interface EventOptionsFromSeason {
    sku?: string[];
    team?: number[];
    start?: string;
    end?: string;
    level?: Level[];
}
export declare function getEvents(season: number, options?: EventOptionsFromSeason): Promise<Event[]>;
export declare type Year = "2020-2021" | "2019-2020" | "2018-2019" | "2017-2018" | "2016-2017" | "2015-2016" | "2014-2015" | "2013-2014" | "2012-2013" | "2011-2012" | "2010-2011" | "2009-2010";
export declare const years: Year[];
/**
 * Gets the Season ID for a given program and year
 * @param program Program
 * @param year Year
 */
export declare function get(program: ProgramAbbr, year: Year): number | undefined;
/**
 * Gets the current season for the given  program
 * @param program Program
 */
export declare function current(program: ProgramAbbr): number | undefined;
