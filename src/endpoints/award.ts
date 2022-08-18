import { IdInfo } from ".";

/**
 * Information about a specific award given to a team or individual at an event.
 */
export interface Award {
  id: number;

  // The event where the award was presented
  event: IdInfo;

  // The order the event should be listed in when displaying all awards. Awards
  // with a lower order score should be listed before those with a higher score
  order: number;

  // The name of the award (ex. "Excellence Award - High School (VRC)")
  title: string;

  // The events that the award qualifies to (this array is similar to event
  // names? RC in this array means the award qualifies for the regional championship)
  qualifications: string[];

  // All winners of this event, and their division if specified
  teamWinners: {
    division: IdInfo;
    team: IdInfo;
  }[];

  // Individual winners of this award if it is not a team award
  individualWinners: string[];
}

export interface AwardOptionsFromEvent {
  // Get awards team(s) have won
  team?: number[];

  // Filter by other non-team winners (individual awards)
  winner?: string[];
}

export interface AwardOptionsFromTeam {
  // Filter awards by the event they were won
  event?: number[];

  // Filter awards by the season they were won in
  season?: number[];
}
