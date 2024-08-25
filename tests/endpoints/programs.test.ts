import { client } from "../__setup__";
import { expect, test } from "vitest";

test("client.programs.get", async () => {
  const response = await client.programs.get(client.programs.V5RC);

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const program = response.data;
  expect(program).toBeDefined();
  expect(program?.id).toBe(client.programs.V5RC);
  expect(program?.name).toBe("VEX V5 Robotics Competition");
});

test("client.programs.all", async () => {
  const response = await client.programs.all({
    "id[]": [client.programs.V5RC],
  });

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const program = response.data?.[0];
  expect(program).toBeDefined();
  expect(program?.id).toBe(client.programs.V5RC);
  expect(program?.name).toBe("VEX V5 Robotics Competition");
});
