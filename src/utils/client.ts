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
    let page = 1;
    let per_page = 250;
    let total = 0;
    let totalPages = 0;

    const data: UnwrappedPaginatedPathTypes[Path] = [];

    const queryBase = init.params?.query ?? {};
    do {
      const request = await base.GET(path, {
        ...init,
        params: {
          ...init.params,
          query: { ...queryBase, page, per_page },
        },
      });

      if (request.error) {
        return { response: request.response, error: request.error };
      }

      const requestData = request.data as Paginated<
        UnwrappedPaginatedPathTypes[Path]
      >;

      if (requestData.data) {
        data.push(...requestData.data);
      }

      if (requestData.meta) {
        total = requestData.meta.total ?? 0;
        totalPages = requestData.meta.last_page ?? 0;
      }

      const nextPageUrl = requestData.meta?.next_page_url;
      if (!nextPageUrl) {
        break;
      }

      const nextPage = new URL(nextPageUrl).searchParams.get("page");

      if (!nextPage) {
        break;
      }

      page = Number.parseInt(nextPage);

      if (!page || Number.isNaN(page)) {
        break;
      }
    } while (data.length < total && page <= totalPages);

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
