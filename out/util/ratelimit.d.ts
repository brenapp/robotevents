/**
 * Tracks ratelimit usage
 */
export declare let MAX: number;
export declare let CURRENT: number;
/**
 * Resolves when you are ok to make requests
 * If you are within your ratelimit, this will resolve immediately
 * Otherwise, it will wait until the ratelimit is refreshed
 */
export declare function ready(): Promise<void>;
/**
 * (For internal use)
 * Updates the current ratelimit usage
 * @param n
 */
export declare function updateCurrent(n: number): void;
/**
 * If it is ok to make a request right now (we still have some ratelimit for this minute)
 */
export declare function ok(): boolean;
