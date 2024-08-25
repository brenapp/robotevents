import {
  ErrorResponse,
  FilterKeys,
  PathsWithMethod,
  ResponseObjectMap,
} from "openapi-typescript-helpers";
import type { Paginated, paths } from "../generated/shim.js";

import createOpenAPIClient, {
  type ClientOptions as OpenAPIClientOptions,
  type Client as OpenAPIClient,
  FetchResponse,
  FetchOptions,
} from "openapi-fetch";

export type PaginatablePaths = {
  [Path in PathsWithMethod<paths, "get">]: FetchResponse<
    paths[Path]["get"],
    unknown,
    "application/json"
  >["data"] extends Paginated<unknown> | undefined
    ? Path
    : never;
}[keyof paths];

export type UnwrappedPaginatedPathTypes = {
  [Path in PathsWithMethod<paths, "get">]: FetchResponse<
    paths[Path]["get"],
    unknown,
    "application/json"
  >["data"] extends Paginated<infer W> | undefined
    ? W[]
    : never;
};

export type PaginatedPaths = {
  [Path in PaginatablePaths]: FetchResponse<
    paths[Path]["get"],
    unknown,
    "application/json"
  >["data"] extends Paginated<infer W> | undefined
    ? {
        get: {
          parameters: paths[Path]["get"]["parameters"];
          requestBody?: paths[Path]["get"]["requestBody"];
          responses: Omit<paths[Path]["get"]["responses"], 200> & {
            200: {
              headers: {
                [name: string]: unknown;
              };
              content: {
                "application/json": W[];
              };
            };
          };
        };
      }
    : never;
};

export type ClientCustomMethods = {
  PaginatedGET<
    Path extends PaginatablePaths,
    Init extends FetchOptions<FilterKeys<paths[Path], "get">>
  >(
    path: Path,
    init: Init
  ): Promise<
    FetchResponse<PaginatedPaths[Path]["get"], {}, "application/json">
  >;
};

type R = FetchResponse<
  paths["/events"]["get"],
  unknown,
  "application/json"
>["data"];
type P = FetchResponse<
  PaginatedPaths["/events"]["get"],
  unknown,
  "application/json"
>["data"];

export type Client = OpenAPIClient<paths, "application/json"> &
  ClientCustomMethods;

export type ClientOptions = {
  authorization: {
    token: string;
  };
  request?: OpenAPIClientOptions;
};

export function createClient(options: ClientOptions): Client {
  const base = createOpenAPIClient<paths, "application/json">({
    baseUrl: "https://www.robotevents.com/api/v2",
    headers: {
      Authorization: `Bearer ${options.authorization.token}`,
      ...options.request?.headers,
    },
    ...options.request,
  });

  // base.use({
  //   onRequest(options) {
  //     console.log("REQUEST", options);
  //   },
  //   onResponse(response) {
  //     console.log("RESPONSE", response);
  //   },
  // });

  const PaginatedGET: ClientCustomMethods["PaginatedGET"] = async <
    Path extends PaginatablePaths,
    Init extends FetchOptions<FilterKeys<paths[Path], "get">>
  >(
    path: Path,
    init: Init
  ) => {
    const queryBase = init.params?.query ?? {};
    const first = await base.GET(path, {
      ...init,
      params: { query: { ...queryBase, page: 1, per_page: 250 } },
    });

    if (first.error) {
      return { response: first.response, error: first.error };
    }

    const firstData = first.data as Paginated<
      UnwrappedPaginatedPathTypes[Path]
    >;

    const data: UnwrappedPaginatedPathTypes[Path] = [];

    if (firstData.data) {
      data.push(...firstData.data);
    }

    const last = firstData.meta?.last_page ?? 0;
    for (let page = 2; page <= last; page++) {
      const next = await base.GET(path, {
        ...init,
        params: { query: { ...queryBase, page, per_page: 250 } },
      });

      if (next.error) {
        return { response: next.response, error: next.error };
      }

      const nextData = next.data as Paginated<
        UnwrappedPaginatedPathTypes[Path]
      >;

      if (nextData.data) {
        data.push(...nextData.data);
      }
    }

    return {
      response: new Response(),
      data: data as NonNullable<
        FetchResponse<
          PaginatedPaths[Path]["get"],
          {},
          "application/json"
        >["data"]
      >,
    };
  };

  return { ...base, PaginatedGET };
}

export type TransformedFetchResponse<
  T,
  K,
  M extends `${string}/${string}`,
  N
> =
  | {
      data: N;
      error?: never;
      response: Response;
    }
  | {
      data?: never;
      error: ErrorResponse<ResponseObjectMap<T>, M>;
      response: Response;
    };

export async function transformResponse<
  T,
  K,
  M extends `${string}/${string}`,
  N
>(
  response: Promise<FetchResponse<T, K, M>>,
  transform: (
    data: NonNullable<FetchResponse<T, K, M>["data"]>,
    response: FetchResponse<T, K, M>
  ) => N | Promise<N>
): Promise<TransformedFetchResponse<T, K, M, N>> {
  const resp = await response;

  if (resp.error) {
    return { response: resp.response, error: resp.error };
  }

  if (!resp.data) {
    return { response: resp.response, data: undefined, error: undefined };
  }

  const data = await transform(resp.data, resp);
  return { response: resp.response, data, error: undefined };
}
