import { GeneratedApiClient, programs } from "../types.js";

export function createProgramsEndpoint(api: GeneratedApiClient) {
  return {
    async get(id: number) {
      return api.programs
        .programGetProgram(id)
        .then((response) => response.data);
    },
    async all() {
      return api.programs
        .programGetPrograms()
        .then((response) => response.data);
    },
  };
}
