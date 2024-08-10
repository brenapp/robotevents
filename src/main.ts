import { createProgramsEndpoint } from "./endpoints/programs.js";
import { Api } from "./generated/robotevents.js";

import type { ClientOptions } from "./types.ts";
export * from "./types.js";

export function Client(options: ClientOptions) {
  const api = new Api<ClientOptions["authorization"]>({
    customFetch: options.request?.customFetch ?? fetch,
    baseUrl: options.request?.baseURL ?? "https://robotevents.com/api/v2",
    securityWorker: (data) => ({
      headers: { Authorization: `Bearer ${data?.token}` },
    }),
  });

  api.setSecurityData(options.authorization);

  return {
    api,
    programs: createProgramsEndpoint(api),
  };
}
