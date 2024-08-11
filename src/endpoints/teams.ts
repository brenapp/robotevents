import { Teams } from "../generated/robotevents.js";
import {
  EndpointOptions,
  Fetcher,
  FetcherResponse,
  ProgramCode,
} from "../types.js";
import { Team } from "../wrappers/Team.js";

export function createTeamsEndpoint(api: EndpointOptions) {
  return {
    async search(
      options: Teams.TeamGetTeams.RequestQuery
    ): Promise<FetcherResponse<Team[]>> {
      const response = await api.paginatedFetch<
        Teams.TeamGetTeams.ResponseBody,
        Teams.TeamGetTeams.RequestQuery
      >("/teams", options);

      if (!response.success) {
        return response;
      }

      const data = response.data?.map((data) => new Team(data, api)) ?? [];
      return { success: true, data };
    },

    async getByNumber(
      number: string,
      program: ProgramCode
    ): Promise<FetcherResponse<Team | null>> {
      const response = await api.paginatedFetch<
        Teams.TeamGetTeams.ResponseBody,
        Teams.TeamGetTeams.RequestQuery
      >("/teams", { "number[]": [number], "program[]": [program] });

      if (!response.success) {
        return response;
      }

      const team = response.data?.[0];
      return { success: true, data: team ? new Team(team, api) : null };
    },

    async get(id: number): Promise<FetcherResponse<Team | null>> {
      const response = await api.fetch<
        Teams.TeamGetTeam.ResponseBody,
        Teams.TeamGetTeam.RequestQuery
      >(`/teams/${id}`);

      return response.success
        ? { success: true, data: new Team(response.data, api) }
        : response;
    },
  };
}
