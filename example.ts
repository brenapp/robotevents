import * as robotevents from "./src/main";
import WatchableCollection from "./src/WatchableCollection";

// Get all Change Up Seasons
const ChangeUp = [
  robotevents.seasons.get("VRC", "2020-2021"),
  robotevents.seasons.get("VEXU", "2020-2021"),
  robotevents.seasons.get("VAIC-U", "2020-2021"),
  robotevents.seasons.get("VAIC-HS", "2020-2021"),
] as number[];

// Get all change up events
(async function () {
  const team = await robotevents.teams.get("BCUZ");
  const matches = await team.matches();

  console.log(matches.size);

  const events = await robotevents.events.search({
    season: ChangeUp,
  });

  for (const event of events) {
    console.log(`${event.name} in ${event.location.country}`);
  }
})();
