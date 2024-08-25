export * from "./generated/shim.js";
export * from "./types.js";

export { Team } from "./wrappers/Team.js";
export { Event } from "./wrappers/Event.js";
export { Match } from "./wrappers/Match.js";

import { createClient, type ClientOptions } from "./utils/client.js";
export { ClientOptions } from "./utils/client.js";

import { eventsEndpoint } from "./endpoints/events.js";
import { programsEndpoints } from "./endpoints/programs.js";
import { seasonsEndpoint } from "./endpoints/seasons.js";
import { teamsEndpoints } from "./endpoints/teams.js";

export function Client(options: ClientOptions) {
  const client = createClient(options);

  const events = eventsEndpoint(client);
  const programs = programsEndpoints(client);
  const seasons = seasonsEndpoint(client);
  const teams = teamsEndpoints(client);

  return {
    api: client,
    events,
    programs,
    seasons,
    teams,
  };
}

export type RobotEventsClient = ReturnType<typeof Client>;
