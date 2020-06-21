/**
 * Manages RobotEvents API authentication
 * In the future this may support EP accounts, but for now we're only supporting the read only API
 */

import { parse } from "set-cookie-parser";

export let COOKIE = "";

import fetch from "node-fetch";

export default async function authenticate() {
  const response = await fetch("https://www.robotevents.com");

  if (!response.ok) {
    return Promise.reject(
      new Error("Could not get CSRF token or Authentication Cookie")
    );
  }

  const cookie = parse(response.headers.raw()["set-cookie"]);

  // Invalidate the cookie after re_session expires
  const re_session = cookie.find((c) => c.name === "re_session");
  setTimeout(() => {
    COOKIE = "";
  }, re_session?.maxAge || 0);

  return (COOKIE = cookie.map((c) => `${c.name}=${c.value}`).join("; "));
}
