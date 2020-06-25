/**
 * Searching/Filtering events
 */
import { Event } from ".";
export declare type Level = "World" | "National" | "State" | "Signature" | "Regional" | "Other";
export interface SearchOptions {
    id?: number[];
    sku?: string[];
    team?: number[];
    season?: number[];
    start?: string;
    end?: string;
    level?: Level[];
}
export default function search(options: SearchOptions): Promise<Event[]>;
