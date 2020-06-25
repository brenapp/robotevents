/**
 * Searching for/filtering teams
 */
import { Team, Grade } from ".";
export interface TeamSearchOptions {
    id?: number[];
    number?: string[];
    event?: number[];
    registered?: boolean;
    program?: number[];
    grade?: Grade[];
    country?: string;
}
export declare function search(options?: TeamSearchOptions, maxAge?: number): Promise<Team[]>;
