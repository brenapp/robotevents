import * as robotevents from "../../src/main";
import inquirer from "inquirer";
import { all, ProgramAbbr } from "../../src/endpoints/programs";
import { Team } from "../../src/endpoints/teams";
import { Match } from "../../src/endpoints/matches";

robotevents.authentication.setBearer("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTUxYzJjODc2Mjg5YjEyZDNkZTAzYTc3NDk5MTVlMTc4MDE1ZDRjMmZiZWM2YWY3NTFkOTgwMWUzZGMwOWE1NDc3MzA1MWNmYzEyNDBmODQiLCJpYXQiOjE2NTYyOTEwMDUuNDQxOTk5OSwibmJmIjoxNjU2MjkxMDA1LjQ0MjAwMywiZXhwIjoyNjAzMDY1ODA1LjQyNjM1ODIsInN1YiI6Ijg5ODQ2Iiwic2NvcGVzIjpbXX0.rau6vgn2Ip0_-nua-g_FfVBOT8HK2K8jm8JQF0UHM07l6auybf8WYTh-VS31o6U0ONmaxm0RojdppwvuxLIB9rgRcshj6kz9VyOulU151BTh-cjAJ2r3Ew9TN0TVXKEVcWptzyLxaPs9N8HEJsMO10G2BxOOs34tr1zGvY7MMY2A8Kg4eHoGtnifMEZXlty9qnY42j2hS8OTafSFgB0UIkCg83aAR5f8hJMn7BJ-yzPkRe-bBrGhzE269H8MKVhC1umkXSbsQn8iItaa-SyvRryQfCqb-2ZiQqLWsZjQxoVq6fbBDdU5YeP6CaGkpYnA8kUXEpR4aSxLOJd_Z3f-5kzm_EjIFlacvWksHPdSWbd9bgj78ypP-_XXvS627K6rv476TT1M7kGG_TPkzgfVuyC2HTx0rG0FKZ39Uxn43yX0Wc2x7Dkq1RpRAcoxSf-yUvnDDlNf3NqFi7gg43VReQEGY3czGk7hGHPD73veB7CLCchwmCmvEciS0AIYDdh2MPjbP39XpFZUPn1FRc0z4V3qJz46TsScr7yMX47GKmd9Uz_xk93v4S6_Phrgmw3Dk1I5MC4lnKi0lBvPALEg_iDbxauRvYcIiN84JeAxu-LlysawOI0HudaJ-FzCaeA3CP6DmaTDvegtYNTZrXbPm02yqyE7l-OLHIrAzjWf07o");


function outcome(team: Team, match: Match) {

    const red = match.alliances.find(a => a.color === "red");
    const blue = match.alliances.find(a => a.color === "blue");

    const isRed = red?.teams.find(t => t.team.id === team.id) !== null;

    const alliance = isRed ? red! : blue!;
    const opponent = isRed ? blue! : red!;


    if (alliance.score === 0 && opponent.score === 0) {
        return "unscored";
    };

    if (alliance.score > opponent.score) {
        return "win";
    } else if (alliance.score < opponent.score) {
        return "loss";
    } else {
        return "tie";
    };
};

(async function () {
    const { program, number } = await inquirer.prompt<{
        program: ProgramAbbr;
        number: string;
    }>([
        {
            name: "number",
            message: "Enter the team number",
            type: "input",
        },
        {
            name: "program",
            message: "Select the program",
            type: "list",
            choices: [
                { name: "VRC", value: "VRC" },
                { name: "VEXU", value: "VEXU" },
                { name: "VAIC", value: "VAIC" },
            ],
        },
    ]);

    const team = await robotevents.teams.get(number, program);
    if (!team) {
        console.log(`Could not find ${team} in ${program}`);
        return;
    }

    console.log(`${team.number} ${team.team_name} - ${team.location.city}, ${team.location.region} #${team.id}`);

    const events = await team.events({
        season: [robotevents.seasons.get(program, "2022-2023")!],
    });

    const ids = events.array().map(e => e.id);

    const matches = await team.matches({ event: ids });
    const outcomes = matches.group(match => outcome(team, match));
    const matchesByEvent = matches.group(match => match.event.name)

    const wins = outcomes.win?.length ?? 0;
    const ties = outcomes.tie?.length ?? 0;
    const losses = outcomes.loss?.length ?? 0;
    const total = wins + ties + losses;

    console.log(`Season Record: ${wins}-${ties}-${losses} (${(100 * wins / total).toFixed(2)}% WR)`);
    console.log("");

    for (const [event, matches] of Object.entries(matchesByEvent)) {
        if (!matches)
            continue;

        const wins = matches.filter(match => outcome(team, match) === "win").length;
        const ties = matches.filter(match => outcome(team, match) === "tie").length;
        const losses = matches.filter(match => outcome(team, match) === "loss").length;
        const total = wins + ties + losses;

        console.log(`${event}: ${wins}-${ties}-${losses} (${(100 * wins / total).toFixed(2)}% WR)`);
    };
})();
