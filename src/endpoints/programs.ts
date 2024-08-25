import { operations } from "../generated/shim.js";
import { Client } from "../utils/client.js";
import { ProgramCode, programs } from "../types.js";

export function programsEndpoints(client: Client) {
  return {
    ...programs,

    /**
     * Get details about a program
     * @param id Program ID
     * @returns Details about the program
     */
    async get(
      id: ProgramCode,
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return client.GET("/programs/{id}", {
        params: { path: { id } },
        ...options,
      });
    },

    /**
     * Get a list of programs
     * @param options Query Params
     * @returns List of programs
     */
    async all(
      query?: operations["program_getPrograms"]["parameters"]["query"],
      options?: Omit<RequestInit, "body" | "headers">
    ) {
      return client.PaginatedGET("/programs", {
        params: { query },
        ...options,
      });
    },
  };
}
