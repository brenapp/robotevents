import { createProgramsEndpoint } from "./endpoints/programs.js";
import { createSeasonsEndpoints } from "./endpoints/seasons.js";

import type {
  ClientOptions,
  EndpointOptions,
  FetcherResponse,
} from "./types.ts";
export * from "./types.js";

const defaultFetch = fetch;

export function makeEndpointOptions(options: ClientOptions): EndpointOptions {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${options.authorization?.token}`);

  async function fetch<T>(
    endpoint: string,
    query?: Record<string, string | number | boolean>,
    init?: RequestInit
  ) {
    const url = new URL(
      (options?.request?.baseURL ?? "https://www.robotevents.com/api/v2") +
        endpoint
    );
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, String(value));
      }
    }

    const request = new Request(url.toString(), {
      ...options?.request?.baseRequest,
      headers,
      ...init,
    });

    const customFetch = options?.request?.customFetch ?? defaultFetch;

    const response = await customFetch(request);
    if (!response.ok) {
      return { success: false, error: response } as const;
    }

    const data = (await response.json()) as T;
    return { success: true, data } as const;
  }

  return { fetch };
}

export function Client(options: ClientOptions) {
  const api: EndpointOptions = makeEndpointOptions(options);
  return {
    api,
    programs: createProgramsEndpoint(api),
    seasons: createSeasonsEndpoints(api),
  };
}
