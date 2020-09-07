/**
 * Lists all official Change Up events
 */

import * as robotevents from "robotevents";

// All Change Up seasons
const ChangeUp = [
  robotevents.seasons.current("VRC"),
  robotevents.seasons.current("VEXU"),
  robotevents.seasons.current("VAIC-HS"),
  robotevents.seasons.current("VAIC-U"),
] as number[];

(async function () {
  const events = await robotevents.events.search({ season: ChangeUp });

  for (const event of events) {
    const [start, end] = [event.start, event.end].map((date) =>
      new Date(date.slice(0, -1)).toLocaleDateString()
    );

    console.log(`[${event.program.code} ${event.level}] ${event.name}`);
    console.log(`${start} to ${end}\n`);
  }
})();
