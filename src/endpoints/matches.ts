import { IdInfo } from "./index";


export type Color = "red" | "blue";
export interface Alliance {
  color: Color;
  score: number;
  teams: {
    team: IdInfo;
    sitting: boolean;
  }[];
}

export enum Round {
  Practice = 1,
  Qualification = 2,
  Quarterfinals = 3,
  Semifinals = 4,
  Finals = 5,
  RoundOf16 = 6,
  TopN = 15,
  RoundRobin = 16
}

/**
 * Information about a specific match played
 */
export interface MatchData {
  id: number;

  // The event the match was played at
  event: IdInfo;

  // The division where the match was played
  division: IdInfo;

  // The round the event took place in (Practice, Quals, R16 QF, SF, F)
  round: Round;

  // The instance the event took place in. For example the first R16 match
  // played at an event (between the 16th and 1st seed in VRC) has instance 1
  instance: number;

  // The match number in a specific match instance. In most cases this is one,
  // but in the case of ties or competitions with multiple elimination it can be
  // higher
  matchnum: number;

  // When the match is scheduled to start, in an ISO date time string
  scheduled: string;

  // When the match actually started, in an ISO date time string
  started: string;

  // The field name that the match took place on
  field: string;

  // Whether the match score has been entered into RobotEvents
  scored: boolean;

  // The name of the Match. Looks like Q15 or R16 1-1 or F3
  name: string;

  // The alliances involved in the match
  alliances: Alliance[];
}

export class Match implements MatchData {

  id = 0;
  event = {
    id: 0,
    name: "",
    code: ""
  }
  division = {
    id: 0,
    name: "",
    code: ""
  }
  round = Round.Qualification;
  instance = 0;
  matchnum = 0;
  scheduled = "";
  started = "";
  field = "";
  scored = false;
  name = "";
  alliances: Alliance[] = [];


  constructor(data: MatchData) {
    Object.assign(this, data);
  };

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
      alliances: this.alliances
    }
  }

  toJSON(): MatchData {
    return this.getData()
  }

  /**
   * Gets the alliance with the given color
   * 
   * @param color Red or Blue
   * @returns The alliance with the given color
   */
  alliance(color: Color): Alliance {
    return this.alliances.find(a => a.color === color) as Alliance;
  };

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
  allianceOutcome(): { winner: Alliance | null, loser: Alliance | null } {
    const red = this.alliance("red");
    const blue = this.alliance("blue");

    if (red.score > blue.score) {
      return { winner: red, loser: blue };
    } else if (blue.score > red.score) {
      return { winner: blue, loser: red }
    } else {
      return { winner: null, loser: null };
    }
  };

  /**
   * Gets the outcome of the match for a specific team
   * 
   * @param team Team number
   */
  teamOutcome(team: string): "win" | "loss" | "tie" | "unscored" {
    const { winner, loser } = this.allianceOutcome();

    if (!this.scored) {
      return "unscored";
    }

    if (!winner || !loser) {
      return "tie";
    }

    if (winner.teams.find(t => t.team.code === team)) {
      return "win";
    } else if (loser.teams.find(t => t.team.code === team)) {
      return "loss";
    } else {
      return "tie";
    };
  };

  /**
   * Gets all of the teams in the match, excludes non-sitting teams (i.e. teams on the alliance who
   * do not play, very rare in modern competitions) 
   * @returns List of all teams in the match
   */
  teams(): IdInfo<string>[] {
    return this.alliances.flatMap(a => a.teams.filter(t => !t.sitting).map(t => t.team))
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
      case Round.Practice: {
        return "P " + this.matchnum;
      }
      case Round.Qualification: {
        return "Q " + this.matchnum;
      }
      case Round.Quarterfinals: {
        return "QF " + id;
      }
      case Round.Semifinals: {
        return "SF " + id;
      }
      case Round.Finals: {
        return "F " + id;
      }
      case Round.RoundOf16: {
        return "R16 " + id;
      }
      case Round.TopN: {
        return "F " + this.matchnum;
      }
      case Round.RoundRobin: {
        return "RR " + id;
      }
    };
  };

};

export interface MatchOptionsFromEvent {
  team?: number[];

  round?: Round[];
  instance?: number[];
  matchnum?: number[];
}

export interface MatchOptionsFromTeam {
  event?: number[];
  season?: number[];
  round?: Round[];
  instance?: number[];
  matchnum?: number[];
}
