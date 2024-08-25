import { client } from "../__setup__";
import { expect, test } from "vitest";

test("client.teams.get", async () => {
  const response = await client.teams.get(63748);

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796B");
  expect(team?.getURL()).toBe("https://www.robotevents.com/teams/V5RC/3796B");
});

test("client.teams.getByNumber", async () => {
  const response = await client.teams.getByNumber(
    "3796B",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796B");
  expect(team?.getURL()).toBe("https://www.robotevents.com/teams/V5RC/3796B");
});

test("client.teams.search", async () => {
  let response = await client.teams.search({ "number[]": ["3796B"] });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data?.[0];
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796B");
  expect(team?.getURL()).toBe("https://www.robotevents.com/teams/V5RC/3796B");

  // Pagination Test
  const worlds = await client.events.getBySKU("RE-VRC-23-3690");

  expect(worlds.error).toBeUndefined();
  expect(worlds.response.ok).toBeTruthy();

  response = await client.teams.search({
    "program[]": [client.programs.V5RC],
    "event[]": [worlds.data?.id!],
  });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  expect(response.data).toBeDefined();
  expect(response.data?.length).toBe(819);
});
