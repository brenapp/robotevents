/**
 * Manages RobotEvents API authentication
 */

export let BEARER = "";

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
 * Checks if the user agent has been authenticated correctly. If this function
 * returns true you may not be ok to make requests, as your session cookie may
 * have been revoked early, however it is generally a good indicator
 */
export function ok() {
  return BEARER !== "";
}
