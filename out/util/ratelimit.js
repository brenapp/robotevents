"use strict";
/**
 * Tracks ratelimit usage
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX = 1080;
exports.CURRENT = 1080;
/**
 * Resolves when you are ok to make requests
 * If you are within your ratelimit, this will resolve immediately
 * Otherwise, it will wait until the ratelimit is refreshed
 */
function ready() {
    // We still have requests this minute
    if (exports.CURRENT-- > 0) {
        return Promise.resolve();
        // We need to wait for the new minute
    }
    else {
        return new Promise(function (resolve) {
            return setInterval(resolve, (60 - new Date().getSeconds()) * 1000);
        });
    }
}
exports.ready = ready;
/**
 * (For internal use)
 * Updates the current ratelimit usage
 * @param n
 */
function updateCurrent(n) {
    exports.CURRENT = n;
}
exports.updateCurrent = updateCurrent;
/**
 * If it is ok to make a request right now (we still have some ratelimit for this minute)
 */
function ok() {
    return exports.CURRENT > 0;
}
exports.ok = ok;
//# sourceMappingURL=ratelimit.js.map