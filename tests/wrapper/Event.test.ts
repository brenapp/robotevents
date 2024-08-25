import { Event, rounds } from "../../out/main";
import { client } from "../__setup__";
import { expect, test } from "vitest";

async function getEvent(sku: string): Promise<Event> {
  const response = await client.events.getBySKU(sku);

  expect(response.error).toBeUndefined();
  expect(response.response.ok).toBeTruthy();

  const event = response.data;
  expect(event).toBeDefined();
  expect(event?.sku).toBe(sku);
  expect(event?.getURL()).toBe(`https://www.robotevents.com/${sku}.html`);

  return event!;
}

test("Event#teams", async () => {
  const event = await getEvent("RE-VRC-22-8603");

  const A = await event.teams({ registered: true });
  expect(A.data).toBeDefined();
  expect(A.error).toBeUndefined();
  expect(A.response.ok).toBeTruthy();

  const B = await client.teams.search({
    "event[]": [event.id],
    registered: true,
  });
  expect(B.data).toBeDefined();
  expect(B.error).toBeUndefined();
  expect(B.response.ok).toBeTruthy();

  expect(A.data?.length).toBeGreaterThan(0);
  expect(B.data?.length).toBeGreaterThan(0);
  expect(A.data?.length).toBe(B.data?.length);

  // Wrapper Check
  expect(A.data?.[0].getURL()).toBeDefined();

  A.data?.forEach((team, i) => {
    expect(team.number).toEqual(B.data?.find((t) => t.id === team.id)?.number);
  });
  B.data?.forEach((team, i) => {
    expect(team.number).toEqual(A.data?.find((t) => t.id === team.id)?.number);
  });
});

test("Event#skills", async () => {
  const event = await getEvent("RE-VRC-22-8603");
  const programmingSkills = await event.skills({ "type[]": ["programming"] });

  expect(programmingSkills.data).toBeDefined();
  expect(programmingSkills.error).toBeUndefined();
  expect(programmingSkills.response.ok).toBeTruthy();

  expect(programmingSkills.data?.length).toBeGreaterThan(0);
  const highest = programmingSkills.data?.sort(
    (a, b) => b.score! - a.score!
  )[0];
  expect(highest).toBeDefined();
  expect(highest?.score).toBe(126);
  expect(highest?.team?.name).toBe("3796H");
});

test("Event#awards", async () => {
  const event = await getEvent("RE-VRC-22-8603");
  let awards = await event.awards();

  expect(awards.data).toBeDefined();
  expect(awards.error).toBeUndefined();
  expect(awards.response.ok).toBeTruthy();

  expect(awards.data?.length).toBe(6);
});

test("Event#matches", async () => {
  const event = await getEvent("RE-VRC-22-8603");
  let matches = await event.matches(1, { "round[]": [rounds.RoundOf16] });

  expect(matches.data).toBeDefined();
  expect(matches.error).toBeUndefined();
  expect(matches.response.ok).toBeTruthy();

  expect(matches.data?.length).toBe(8);

  // Wrapper Check
  expect(matches.data?.[0].getData()).toBeDefined();
});

test("Event#finalistRankings", async () => {
  const event = await getEvent("RE-VIQRC-23-3693");
  const rankings = await event.finalistRankings(1);

  expect(rankings.data).toBeDefined();
  expect(rankings.error).toBeUndefined();
  expect(rankings.response.ok).toBeTruthy();

  expect(rankings.data?.length).toBe(20);
});

test("Event#rankings", async () => {
  const event = await getEvent("RE-VIQRC-23-3693");
  const rankings = await event.rankings(1);

  expect(rankings.data).toBeDefined();
  expect(rankings.error).toBeUndefined();
  expect(rankings.response.ok).toBeTruthy();

  expect(rankings.data?.length).toBe(84);
});
