/**
 * Tracks ratelimit usage
 */

export let MAX = 1080;
export let CURRENT = 1080;

/**
 * Convience method, awaits ratelimit readyness
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
