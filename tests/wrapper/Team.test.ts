import { Event, rounds } from "../../out/main";
import { client } from "../__setup__";
import { expect, test } from "vitest";

test("Team#events", async () => {
  const response = await client.teams.getByNumber(
    "3796H",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796H");

  const events = await team!.events();
  expect(events.data).toBeDefined();
  expect(events.error).toBeUndefined();
  expect(events.response.ok).toBeTruthy();

  expect(events.data?.length).toBeGreaterThan(0);
  expect(events.data?.[0].getURL()).toBeDefined();
});

test("Team#matches", async () => {
  const response = await client.teams.getByNumber(
    "3796H",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796H");

  const matches = await team!.matches();
  expect(matches.data).toBeDefined();
  expect(matches.error).toBeUndefined();
  expect(matches.response.ok).toBeTruthy();

  expect(matches.data?.length).toBeGreaterThan(0);
  expect(matches.data?.[0].getData()).toBeDefined();
  expect(
    matches.data?.every((match) =>
      match
        .teams()
        .map((t) => t.name)
        .includes(team!.number)
    )
  ).toBeTruthy();
});

test("Team#rankings", async () => {
  const response = await client.teams.getByNumber(
    "3796H",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796H");

  const rankings = await team!.rankings();
  expect(rankings.data).toBeDefined();
  expect(rankings.error).toBeUndefined();
  expect(rankings.response.ok).toBeTruthy();

  expect(rankings.data?.length).toBeGreaterThan(0);
  expect(
    rankings.data?.every((ranking) => ranking.team!.name === team!.number)
  ).toBeTruthy();
});

test("Team#skills", async () => {
  const response = await client.teams.getByNumber(
    "3796H",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796H");

  const skills = await team!.skills();
  expect(skills.data).toBeDefined();
  expect(skills.error).toBeUndefined();
  expect(skills.response.ok).toBeTruthy();

  expect(skills.data?.length).toBeGreaterThan(0);
  expect(
    skills.data?.every((skill) => skill.team!.name === team!.number)
  ).toBeTruthy();
});

test("Team#awards", async () => {
  const response = await client.teams.getByNumber(
    "3796H",
    client.programs.V5RC
  );

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const team = response.data;
  expect(team).toBeDefined();
  expect(team?.number).toBe("3796H");

  const awards = await team!.awards();
  expect(awards.data).toBeDefined();
  expect(awards.error).toBeUndefined();
  expect(awards.response.ok).toBeTruthy();

  expect(awards.data?.length).toBeGreaterThan(0);
  expect(
    awards.data?.every((award) =>
      award.teamWinners?.some((t) => t.team?.name === team!.number)
    )
  ).toBeTruthy();
});
