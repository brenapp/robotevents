import programs from "./endpoints/programs";
import season, { current } from "./endpoints/season";
import event from "./endpoints/events";

(async function () {
  const spring = await event("RE-VRC-19-8312");
  const matches = await spring.matches(spring.divisions[0].id);
  const teams = await spring.teams();

  spring.watch();
  spring.on("update", (key, current) => {
    if (key !== "awards_finalized") return false;

    if (current) {
      console.log("Awards Finalized!");
    }
  });

  console.log(`${spring.name} @ ${spring.location.venue}`);
  for (const match of matches) {
    const [red, blue] = match.alliances;
    console.log(
      `${match.name} - ${red.teams
        .map((r) => r.team.name)
        .join(" ")} vs. ${blue.teams.map((r) => r.team.name).join(" ")}: ${
        red.score
      } to ${blue.score}`
    );
  }
})();
