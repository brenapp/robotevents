import * as robotevents from "./src/main";
import WatchableCollection from "./src/WatchableCollection";
import { Round } from "./src/endpoints/matches";

// Get all Change Up Seasons
const ChangeUp = [
  robotevents.seasons.get("VRC", "2020-2021"),
  robotevents.seasons.get("VEXU", "2020-2021"),
  robotevents.seasons.get("VAIC-U", "2020-2021"),
  robotevents.seasons.get("VAIC-HS", "2020-2021"),
] as number[];

(async function () {
  const team = await robotevents.teams.get("BCUZ");
  const matches = await team.matches({
    round: [
      Round.Finals,
      Round.Semifinals,
      Round.Quarterfinals,
      Round.RoundOf16,
    ],
  });

  console.log(matches.size);

  // Get all change up events
  const events = await robotevents.events.search({
    season: ChangeUp,
  });

  for (const event of events) {
    console.log(`${event.name} in ${event.location.country}`);
  }
})();
