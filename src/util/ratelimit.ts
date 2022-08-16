/**
 * Tracks ratelimit usage
 */

// The maximum number of allowed requests per minute
export let MAX = 1000;

// The current number of remaining requests this time
export let CURRENT = 1000;

/**
 * Resolves when you are ok to make requests
 * If you are within your ratelimit, this will resolve immediately
 * Otherwise, it will wait until the ratelimit is refreshed
 */
export function ready() {
  // We still have requests this minute
  if (CURRENT-- > 0) {
    return Promise.resolve();

    // We need to wait for the new minute
  } else {
    return new Promise<void>((resolve) =>
      setInterval(resolve, (60 - new Date().getSeconds()) * 1000)
    );
  }
}

/**
 * (For internal use)
 * Updates the current ratelimit usage
 * @param n
 */
export function updateCurrent(n: number) {
  CURRENT = n;
}

/**
 * If it is ok to make a request right now (we still have some ratelimit for this minute)
 */
export function ok() {
  return CURRENT > 0;
}
