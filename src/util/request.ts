/**
 * Makes a ratelimit respecting request to the robotevents API,
 * supporting caching using keya
 *
 * Every minute, you are allowed to make 1080 requests,
 * this module will automatically queue requests to ensure
 * that ratelimiting is obeyed
 *
 */

import fetch from "node-fetch";
import * as keya from "keya";
import { ready, updateCurrent } from "./ratelimit";
import { authenticate, COOKIE } from "./authentication";

export interface RobotEventsRequest {
  [key: string]: string | string[] | number | number[];
}

/**
 * Serializes parameters into a string to be passed to the API
 * @param params RobotEventsRequest
 */
function serialize(params: RobotEventsRequest): string {
  let body = "";

  for (const [key, value] of Object.entries(params)) {
    switch (typeof value) {
      // Normal passed parameters can be serialized as normal
      case "string":
      case "number":
        body += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        break;

      // Arrays need to have all of their components added seperately
      case "object": {
        for (const v of value) {
          body += `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}&`;
        }

        break;
      }
    }
  }

  // Remove the last amperstand and return
  return body.slice(0, body.length - 1);
}

export interface CacheEntry<T = unknown> {
  created: number;
  value: T[];
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

async function doRequest<T = unknown>(
  url: URL
): Promise<{ meta: PageMeta; data: T[] }> {
  // Authenticate if we haven't already
  if (!COOKIE) {
    await authenticate();
  }

  // Wait for the ratelimit to be clear (resolves immediately if ok)
  await ready();

  // Make the inital request
  const response = await fetch(url.href, {
    headers: {
      cookie: COOKIE,
    },
    redirect: "manual",
  });

  // If the response redirected, we need to authenticate and try again
  if (response.status === 302) {
    await authenticate();
    return doRequest(url);
  }

  // Set the new ratelimit
  if (response.headers.has("x-ratelimit-remaining")) {
    updateCurrent(
      parseInt(response.headers.get("x-ratelimit-remaining") as string)
    );
  }

  // If the response errored tell us
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
  const store = await keya.store<CacheEntry<T>>("robotevents");

  // Join the URL together
  const url = new URL(endpoint, "https://www.robotevents.com/api/v2/");

  // Add the (custom seralized) search params to support the custom array behavior of the API
  url.search = serialize({ per_page: 250, ...params });

  // See if the store has a non-stale instance of this href
  const cached = await store.get(decodeURI(url.href));
  if (cached) {
    const age = Date.now() - cached.created;

    if (age <= maxAge) {
      return cached.value;
    }
  }

  // Now get the inital request
  let page = await doRequest<T>(url);
  let data = page.data;

  // Paginate if needed
  while (page.meta.current_page < page.meta.last_page) {
    url.searchParams.set("page", (page.meta.current_page + 1).toString());
    page = await doRequest<T>(url);

    data.push(...page.data);
  }

  // Delete pagination keys
  url.searchParams.delete("page");

  // Set the cache value
  await store.set(decodeURI(url.href), {
    created: Date.now(),
    value: data,
  });

  return data;
}
