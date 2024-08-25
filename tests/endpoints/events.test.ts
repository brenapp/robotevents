import { client } from "../__setup__";
import { expect, test } from "vitest";

test("client.events.search", async () => {
  let response = await client.events.search({ "sku[]": ["RE-VRC-23-1488"] });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data?.[0];
  expect(event).toBeDefined();
  expect(event?.sku).toBe("RE-VRC-23-1488");

  // Pagination Test
  response = await client.events.search({
    "season[]": [client.seasons[client.programs.V5RC]["2023-2024"]],
  });
});

test("client.events.get", async () => {
  const response = await client.events.get(51488);

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data;
  expect(event).toBeDefined();
  expect(event?.sku).toBe("RE-VRC-23-1488");
});
