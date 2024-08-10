import { EndpointOptions, Program } from "../types.js";

export function createProgramsEndpoint({ fetch }: EndpointOptions) {
  return {
    async get(id: number) {
      return fetch<Program>(`/programs/${id}`);
    },
    async all() {
      return fetch<Program[]>("/programs");
    },
  };
}
