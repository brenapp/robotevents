import { Teams } from "../generated/robotevents.js";
import { EndpointOptions, TeamData } from "../types.js";
import { Team } from "../wrappers/Team.js";

export function createTeamsEndpoint(api: EndpointOptions) {
  return {
    async search(options: Teams.TeamGetTeams.RequestQuery) {
      const response = await api.paginatedFetch<
        Teams.TeamGetTeams.ResponseBody,
        Teams.TeamGetTeams.RequestQuery
      >("/teams", options);

      return response.success
        ? (response.data?.map((data) => new Team(data, api)) ?? [])
        : [];
    },

    async get(id: number) {
      const response = await api.fetch<
        Teams.TeamGetTeam.ResponseBody,
        Teams.TeamGetTeam.RequestQuery
      >(`/teams/${id}`);

      return response.success ? new Team(response.data, api) : null;
    },
  };
}
