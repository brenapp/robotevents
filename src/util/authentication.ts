/**
 * Manages RobotEvents API authentication
 * In the future this may support EP accounts, but for now we're only supporting the read only API
 */

import { parse } from "set-cookie-parser";

export let COOKIE = "";
let EXPIRES = Date.now();

import fetch from "node-fetch";

/**
 * Automatically authenticates
 *
 * This function will perform a request to https://www.robotevents.com to get a re_session cookie with which to perform requests
 * Note: This function is automatically called when it is required
 */
export async function basic() {
  const response = await fetch("https://www.robotevents.com");

  if (!response.ok) {
    return Promise.reject(
      new Error("Could not get CSRF token or Authentication Cookie")
    );
  }

  const cookie = parse(response.headers.raw()["set-cookie"]);

  // Invalidate the cookie after re_session expires
  const re_session = cookie.find((c) => c.name === "re_session");
  const expires = 1000 * (re_session?.maxAge ?? 0) + Date.now();

  return setCookie(
    cookie.map((c) => `${c.name}=${c.value}`).join("; "),
    expires
  );
}

/**
 * Sets the RobotEvents Cookie (required for access)
 * @param cookie
 * @param expires
 */
export function setCookie(cookie: string, expires: number) {
  EXPIRES = expires;
  return (COOKIE = cookie);
}

/**
 * Checks if the user agent has been authenticated correctly
 */
export function ok() {
  let ok = !COOKIE && EXPIRES > Date.now();
  if (!ok) {
    COOKIE = "";
  }

  return ok;
}
