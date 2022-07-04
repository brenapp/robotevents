/**
 * Manages RobotEvents API authentication
 * In the future this may support EP accounts, but for now we're only supporting the read only API
 */

import { parse } from "set-cookie-parser";

export let COOKIE = "";
export let BEARER = "";
let EXPIRES = Date.now();
import fetch from "cross-fetch";

/**
 * Automatically authenticates
 *
 * This function will perform a request to https://www.robotevents.com to get a re_session cookie with which to perform requests
 * Note: This function is mostly internal, and is automatically called when
 * needed. If you need to prepare authentication early for any reason you can
 * use this function to do so
 *
 * @example
 *
 * await robotevents.authentication.basic();
 * console.log(robotevents.authentication.ok()); // True
 *
 */
export async function basic(implementation: typeof fetch = fetch) {
  const response = await implementation("https://www.robotevents.com");

  if (!response.ok) {
    return Promise.reject(
      new Error("Could not get CSRF token or Authentication Cookie")
    );
  }

  const cookie = parse(response.headers.get("set-cookie") as string);

  // Invalidate the cookie after re_session expires
  const re_session = cookie.find((c) => c.name === "re_session");
  const expires = 1000 * (re_session?.maxAge ?? 0) + Date.now();

  return setCookie(
    cookie.map((c) => `${c.name}=${c.value}`).join("; "),
    expires
  );
}

/**
 * Sets the Bearer Token to provide to robotevents. This is useful if you have
 * priveledged access to the robotevents API
 *
 * @param bearer
 */
export function setBearer(bearer: string) {
  return (BEARER = bearer);
}

/**
 * Sets the RobotEvents Cookie (required for access). A readonly cookie is
 * automatically fetched if not overriden by this function. This is useful
 * for users with priveledged access to the robotevents API
 * @param cookie
 * @param expires
 */
export function setCookie(cookie: string, expires: number) {
  EXPIRES = expires;
  return (COOKIE = cookie);
}

/**
 * Checks if the user agent has been authenticated correctly. If this function
 * returns true you may not be ok to make requests, as your session cookie may
 * have been revoked early, however it is generally a good indicator
 */
export function ok() {
  return (!!COOKIE && EXPIRES > Date.now()) || (BEARER);
}
