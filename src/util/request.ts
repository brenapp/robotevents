/**
 * Makes a ratelimit respecting request to the robotevents API,
 * supporting caching using keya
 *
 * Every minute, you are allowed to make 1080 requests,
 * this module will automatically queue requests to ensure
 * that rate limiting is obeyed
 **/

import fetch from "cross-fetch";
import { ready, updateCurrent } from "./ratelimit";
import { BEARER } from "./authentication";

/**
 * Serializes parameters into a string to be passed to the API
 * @param params RobotEventsRequest
 */
function serialize(params: object): string {
  let body = "";

  for (const [key, value] of Object.entries(params)) {
    switch (typeof value) {
      // Normal passed parameters can be serialized as normal
      case "string":
      case "number":
        body += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        break;

      // Arrays need to have all of their components added separately
      case "object": {
        for (const v of value) {
          body += `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}&`;
        }

        break;
      }
    }
  }

  // Remove the last ampersand and return
  return body.slice(0, body.length - 1);
}

export interface CacheEntry<T = unknown> {
  created: number;
  value: T;
}

export interface PageMeta {
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

async function doRequest<T = unknown>(url: URL): Promise<T> {

  // Wait for the ratelimit to be clear (resolves immediately if ok)
  await ready();

  let headers = {} as Record<string, string>;

  if (BEARER) {
    headers["Authorization"] = `Bearer ${BEARER}`;
  }

  // Make the initial request
  const response = await fetch(url.href, {
    headers,
  });

  // Set the new ratelimit
  if (response.headers.has("x-ratelimit-remaining")) {
    updateCurrent(
      parseInt(response.headers.get("x-ratelimit-remaining") as string)
    );
  }

  // If the response errored reject accordingly
  if (!response.ok) {
    return Promise.reject(await response.text());
  }

  return response.json();
}

export default async function request<T = unknown>(
  endpoint: string,
  params: object,
  maxAge = Infinity
): Promise<T[]> {
  // Join the URL together
  const url = new URL(endpoint, "https://www.robotevents.com/api/v2/");

  // Add the (custom serialized) search params to support the custom array behavior of the API
  url.search = serialize({ per_page: 250, ...params });

  // Now get the initial request
  let page = await doRequest<{ meta: PageMeta; data: T[] }>(url);
  let data = page.data;

  // Paginate if needed
  while (page.meta.current_page < page.meta.last_page) {
    url.searchParams.set("page", (page.meta.current_page + 1).toString());
    page = await doRequest<{ meta: PageMeta; data: T[] }>(url);

    data.push(...page.data);
  }

  // Delete pagination keys
  url.searchParams.delete("page");

  return data;
}

export async function requestSingle<T>(
  endpoint: string,
  params: object,
  maxAge = Infinity
) {

  // Join the URL together
  const url = new URL(endpoint, "https://www.robotevents.com/api/v2/");

  // Add the (custom serialized) search params to support the custom array behavior of the API
  url.search = serialize(params);

  return doRequest<T>(url);
}
