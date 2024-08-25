import { client } from "../__setup__";
import { expect, test } from "vitest";

test("client.events.search", async () => {
  let response = await client.events.search({ "sku[]": ["RE-VRC-23-1488"] });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data?.[0];
  expect(event).toBeDefined();
  expect(event?.sku).toBe("RE-VRC-23-1488");
  expect(event?.getURL()).toBe(
    "https://www.robotevents.com/RE-VRC-23-1488.html"
  );

  // Pagination Test
  response = await client.events.search({
    "season[]": [client.seasons[client.programs.V5RC]["2023-2024"]],
  });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  expect(response.data).toBeDefined();
  expect(response.data?.length).toBe(1549);
});

test("client.events.get", async () => {
  const response = await client.events.get(51488);

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data;
  expect(event).toBeDefined();
  expect(event?.sku).toBe("RE-VRC-23-1488");
  expect(event?.getURL()).toBe(
    "https://www.robotevents.com/RE-VRC-23-1488.html"
  );
});

test("client.events.getBySKU", async () => {
  const response = await client.events.getBySKU("RE-VRC-23-1488");

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data;
  expect(event).toBeDefined();
  expect(event?.sku).toBe("RE-VRC-23-1488");
  expect(event?.getURL()).toBe(
    "https://www.robotevents.com/RE-VRC-23-1488.html"
  );
});
