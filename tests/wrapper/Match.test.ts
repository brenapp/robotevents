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

test("Match#alliance", async () => {
  const event = await getEvent("RE-VRC-22-8603");
  const finals = await event.matches(1, { "round[]": [rounds.Finals] });

  expect(finals.data).toBeDefined();
  expect(finals.error).toBeUndefined();
  expect(finals.response.ok).toBeTruthy();

  const match = finals.data?.[0];
  expect(match).toBeDefined();

  expect(match?.alliance("red").color).toEqual("red");
  expect(match?.alliance("blue").color).toEqual("blue");
});

test("Match#allianceOutcome (from event.matches)", async () => {
  const event = await getEvent("RE-VRC-22-8603");
  const finals = await event.matches(1, { "round[]": [rounds.Finals] });

  expect(finals.data).toBeDefined();
  expect(finals.error).toBeUndefined();
  expect(finals.response.ok).toBeTruthy();

  const match = finals.data?.[0];
  expect(match).toBeDefined();

  expect(match?.allianceOutcome().winner?.color).toEqual("red");
  expect(match?.allianceOutcome().loser?.color).toEqual("blue");

  expect(new Set(match?.teams().map((team) => team.name))).toEqual(
    new Set(["3796H", "3796B", "3796A", "3796F"])
  );

  expect(match?.teamOutcome("3796H")).toBe("win");
  expect(match?.teamOutcome("3796B")).toBe("win");
  expect(match?.teamOutcome("3796A")).toBe("loss");
  expect(match?.teamOutcome("3796F")).toBe("loss");
});
