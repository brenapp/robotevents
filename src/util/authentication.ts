/**
 * Manages RobotEvents API authentication
 */

export let BEARER = "";
export let COOKIE = "";

/**
 * Sets the Bearer Token to provide to robotevents. This is useful if you have
 * privileged access to the robotevents API
 *
 * @param bearer
 */
export function setBearer(bearer: string) {
  return (BEARER = bearer);
}

/**
 * Sets the Cookie to provide to robotevents.
 * because access API by bearer will not get the limit info in Response.header.
 * but When access API by cookie, they will give the limit info back.
 * So We can set the cookie instead of the official Bearer.
 *
 * @param cookie
 */
export function setCookie(cookie: string) {
  return (COOKIE = cookie);
}

/**
 * Checks if the user agent has been authenticated correctly. If this function
 * returns true you may not be ok to make requests, as your session cookie may
 * have been revoked early, however it is generally a good indicator
 */
export function ok() {
  return BEARER !== "" || COOKIE != "";
}
