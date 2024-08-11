import { createProgramsEndpoint } from "./endpoints/programs.js";
import { createSeasonsEndpoints } from "./endpoints/seasons.js";
import { createTeamsEndpoint } from "./endpoints/teams.js";
import { createEventsEndpoint } from "./endpoints/events.js";

import { makeEndpointOptions } from "./utils/makeEndpointOptions.js";
import type { ClientOptions, EndpointOptions } from "./types.ts";
export * from "./types.js";

export { Team } from "./wrappers/Team.js";
export { Event } from "./wrappers/Event.js";
export { Match } from "./wrappers/Match.js";

export function Client(options: ClientOptions) {
  const api: EndpointOptions = makeEndpointOptions(options);
  return {
    api,
    programs: createProgramsEndpoint(api),
    seasons: createSeasonsEndpoints(api),
    teams: createTeamsEndpoint(api),
    events: createEventsEndpoint(api),
  };
}
