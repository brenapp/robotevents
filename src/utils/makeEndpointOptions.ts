import type {
  ClientOptions,
  EndpointOptions,
  FailedResponse,
  FetcherQueryParams,
  FetcherResponse,
  PaginatedData,
  SuccessfulResponse,
} from "../types.ts";

export type PaginationOptions<Q extends FetcherQueryParams> = {
  page?: number;
  per_page?: number;
};

const defaultFetch = fetch;

export function makeEndpointOptions(options: ClientOptions): EndpointOptions {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${options.authorization?.token}`);

  const fetch = async <T, Q>(
    endpoint: string,
    query?: Q,
    init?: ResponseInit
  ) => {
    const url = new URL(
      (options?.request?.baseURL ?? "https://www.robotevents.com/api/v2") +
        endpoint
    );
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (typeof value === "undefined") continue;

        if (Array.isArray(value)) {
          for (const item of value) {
            url.searchParams.append(key, String(item));
          }
        } else {
          url.searchParams.set(key, String(value));
        }
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
      try {
        const data = await response.json();
        return { success: false, error: data } as FailedResponse;
      } catch (error) {
        return {
          success: false,
          error: { message: response.statusText },
        } as FailedResponse;
      }
    }

    const data = (await response.json()) as T;
    return { success: true, data } as SuccessfulResponse<T>;
  };

  const paginatedFetch = async <
    T extends PaginatedData<unknown>,
    Q extends FetcherQueryParams,
  >(
    endpoint: string,
    query?: Q,
    init?: ResponseInit
  ) => {
    type U = T["data"];

    const response = await fetch<T, PaginationOptions<Q>>(
      endpoint,
      { ...query, per_page: 250, page: 1 },
      init
    );
    if (!response.success) return response as FetcherResponse<U>;

    const data = [] as U;
    if (response.data.data) {
      data?.push(...response.data.data);
    }

    const meta = response.data.meta;
    if (!meta?.last_page || meta.current_page === meta.last_page) {
      return { success: true, data } as FetcherResponse<U>;
    }

    for (let i = meta.current_page! + 1; i <= meta.last_page!; i++) {
      const page = await fetch<T, PaginationOptions<Q>>(
        endpoint,
        { ...query, page: i },
        init
      );

      if (!page.success) return page as FetcherResponse<U>;
      if (!page.data.data) break;
      data?.push(...page.data.data);
    }

    return { success: true, data } as FetcherResponse<U>;
  };

  return { fetch, paginatedFetch };
}
