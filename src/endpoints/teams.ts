import { operations } from "../generated/shim.js";
import { Client, transformResponse } from "../utils/client.js";
import { Team } from "../wrappers/Team.js";

export function teamsEndpoints(client: Client) {
  return {
    /**
     * Get team by their ID (not number)
     * @param id Team ID
     * @returns Team
     **/
    async get(id: number, options?: Omit<RequestInit, "body" | "headers">) {
      return transformResponse(
        client.GET("/teams/{id}", { params: { path: { id } }, ...options }),
        (data) => new Team(data, client)
      );
    },

    /**
     * Get a list of teams
     * @param options Query Params
     * @returns List of teams
     **/
    async search(
      query: operations["team_getTeams"]["parameters"]["query"],
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return transformResponse(
        client.PaginatedGET("/teams", { params: { query }, ...options }),
        (data) => data.map((team) => new Team(team, client))
      );
    },
  };
}
