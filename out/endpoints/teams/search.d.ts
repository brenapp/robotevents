/**
 * Searching for/filtering teams
 */
import { Team, Grade } from ".";
interface SearchOptions {
    id?: number[];
    number?: string[];
    event?: number[];
    registered?: boolean;
    program?: number[];
    grade?: Grade[];
    country?: string;
}
export declare function search(options?: SearchOptions): Promise<Team[]>;
export {};
