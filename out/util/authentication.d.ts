/**
 * Manages RobotEvents API authentication
 * In the future this may support EP accounts, but for now we're only supporting the read only API
 */
export declare let COOKIE: string;
/**
 * Automatically authenticates
 *
 * This function will perform a request to https://www.robotevents.com to get a re_session cookie with which to perform requests
 * Note: This function is automatically called when it is required
 */
export declare function basic(): Promise<string>;
/**
 * Sets the RobotEvents Cookie (required for access)
 * @param cookie
 * @param expires
 */
export declare function setCookie(cookie: string, expires: number): string;
/**
 * Checks if the user agent has been authenticated correctly
 */
export declare function ok(): boolean;
