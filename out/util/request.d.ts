/**
 * Makes a ratelimit respecting request to the robotevents API,
 * supporting caching using keya
 *
 * Every minute, you are allowed to make 1080 requests,
 * this module will automatically queue requests to ensure
 * that ratelimiting is obeyed
 *
 */
export interface CacheEntry<T = unknown> {
    created: number;
    value: T;
}
export interface PageMeta {
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export default function request<T = unknown>(endpoint: string, params: object, maxAge?: number): Promise<T[]>;
export declare function requestSingle<T>(endpoint: string, params: object, maxAge?: number): Promise<T>;
