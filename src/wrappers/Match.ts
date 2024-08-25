import { components } from "../generated/robotevents.js";
import { Color, IdInfo } from "../main.js";
import { Alliance, MatchData, rounds } from "../types.js";

export class Match implements MatchData {
  constructor(data: MatchData) {
    this.id = data.id;
    this.event = data.event;
    this.division = data.division;
    this.round = data.round;
    this.instance = data.instance;
    this.matchnum = data.matchnum;
    this.scheduled = data.scheduled;
    this.started = data.started;
    this.field = data.field;
    this.scored = data.scored;
    this.name = data.name;
    this.alliances = data.alliances;
  }
  id: number;
  event: { id: number; name: string; code?: string | null };
  division: { id: number; name: string; code?: string | null };
  round: number;
  instance: number;
  matchnum: number;
  scheduled?: string | undefined;
  started?: string | undefined;
  field?: string | undefined;
  scored: boolean;
  name: string;
  alliances: {
    color: "red" | "blue";
    score: number;
    teams: components["schemas"]["AllianceTeam"][];
  }[];

  getData(): MatchData {
    return {
      id: this.id,
      event: this.event,
      division: this.division,
      round: this.round,
      instance: this.instance,
      matchnum: this.matchnum,
      scheduled: this.scheduled,
      started: this.started,
      field: this.field,
      scored: this.scored,
      name: this.name,
      alliances: this.alliances,
    };
  }

  toJSON(): MatchData {
    return this.getData();
  }

  /**
   * Gets the alliance with the given color
   *
   * @param color Red or Blue
   * @returns The alliance with the given color
   */
  alliance(color: Color): Alliance {
    return this.alliances.find((a) => a.color === color) as Alliance;
  }

  /**
   * Gets the outcome of the match
   *
   * @example
   * const team = await robotevents.teams.get("3796B");
   * const matches = await team.matches();
   *
   * for (const match of match) {
   *  const { winner, loser } = match.allianceOutcome();
   *  console.log(winner.color, loser.color)
   * };
   *
   * @returns The winning and losing alliance, or null if the match is unscored or tied
   */
  allianceOutcome(): { winner: Alliance | null; loser: Alliance | null } {
    const red = this.alliance("red");
    const blue = this.alliance("blue");

    if (red.score > blue.score) {
      return { winner: red, loser: blue };
    } else if (blue.score > red.score) {
      return { winner: blue, loser: red };
    } else {
      return { winner: null, loser: null };
    }
  }

  /**
   * Gets the outcome of the match for a specific team
   *
   * @param team Team number
   */
  teamOutcome(team: string): "win" | "loss" | "tie" | "unscored" {
    const { winner, loser } = this.allianceOutcome();

    if (!this.scored && !winner && !loser) {
      return "unscored";
    }

    if (!winner || !loser) {
      return "tie";
    }

    if (winner.teams.find((t) => t.team?.name === team)) {
      return "win";
    } else if (loser.teams.find((t) => t.team?.name === team)) {
      return "loss";
    } else {
      return "tie";
    }
  }

  /**
   * Gets all of the teams in the match, excludes non-sitting teams (i.e. teams on the alliance who
   * do not play, very rare in modern competitions)
   * @returns List of all teams in the match
   */
  teams(): IdInfo[] {
    return this.alliances.flatMap((a) =>
      a.teams.filter((t) => !t.sitting).map((t) => t.team!)
    );
  }

  /**
   * Gets a short name for this match based on the round. Short name looks something like
   *
   * ```
   * P 13
   * Q 23
   * R16 1-1
   * QF 1-1
   * SF 2-1
   * F 1-3
   * F 3 // IQ finals matches
   * RR 2-1 // Round Robin
   * ```
   *
   */
  shortName(): string {
    const id = this.instance + "-" + this.matchnum;
    switch (this.round) {
      case rounds.Practice: {
        return "P " + this.matchnum;
      }
      case rounds.Qualification: {
        return "Q " + this.matchnum;
      }
      case rounds.Quarterfinals: {
        return "QF " + id;
      }
      case rounds.Semifinals: {
        return "SF " + id;
      }
      case rounds.Finals: {
        return "F " + id;
      }
      case rounds.RoundOf16: {
        return "R16 " + id;
      }
      case rounds.TopN: {
        return "F " + this.matchnum;
      }
      case rounds.RoundRobin: {
        return "RR " + id;
      }
      default: {
        return this.name;
      }
    }
  }
}
