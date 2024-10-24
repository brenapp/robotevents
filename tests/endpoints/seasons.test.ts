import { client } from "../__setup__";
import { expect, test } from "vitest";

test("client.seasons.get", async () => {
  const response = await client.seasons.get(
    client.seasons[client.programs.V5RC]["2024-2025"]
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const season = response.data;
  expect(season).toBeDefined();
  expect(season?.id).toBe(client.seasons[client.programs.V5RC]["2024-2025"]);
  expect(season?.name).toBe(
    "VEX V5 Robotics Competition 2024-2025: High Stakes"
  );
});

test("client.seasons.all", async () => {
  const response = await client.seasons.all({
    "id[]": [client.seasons[client.programs.V5RC]["2024-2025"]],
  });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const season = response.data?.[0];
  expect(season).toBeDefined();
  expect(season?.id).toBe(client.seasons[client.programs.V5RC]["2024-2025"]);
  expect(season?.name).toBe(
    "VEX V5 Robotics Competition 2024-2025: High Stakes"
  );
});

test("client.seasons.events", async () => {
  const response = await client.seasons.events(
    client.seasons[client.programs.V5RC]["2023-2024"]
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  expect(response.data).toBeDefined();
  expect(response.data?.length).toBe(1549);
});
