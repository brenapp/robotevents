import { EndpointOptions, Program } from "../types.js";
import { Programs } from "../generated/robotevents.js";

export function createProgramsEndpoint({ fetch }: EndpointOptions) {
  return {
    async get(id: number) {
      return fetch<
        Programs.ProgramGetProgram.ResponseBody,
        Programs.ProgramGetProgram.RequestQuery
      >(`/programs/${id}`);
    },
    async all(options: Programs.ProgramGetPrograms.RequestQuery) {
      return fetch<
        Programs.ProgramGetProgram.ResponseBody,
        Programs.ProgramGetPrograms.RequestQuery
      >("/programs", options);
    },
  };
}
