# RobotEvents

Realtime API for [RobotEvents](https://www.robotevents.com) data.

Features

- Watch all constructs for changes
- Full Support for public RobotEvents v2 API
- Full Types
- Automatic Authentication, with support for custom tokens
- Cache Management
- Automatic Ratelimiting

## Install

```
yarn add robotevents
```
or
```
npm install robotevents
```

## Basic Usage

This example will log all scored matches from an event and print when the event's awards are finalized

```TypeScript

import * as robotevents from "robotevents";
import { Round } from "robotevents/endpoints/matches"


const event = await robotevents.events.get(process.env.SKU);

// Watch the 1st Division
const division = event.divisions[0];
console.log(`${event.name} on ${event.start} @ ${event.location.venue}`);
console.log(division.name);

// Watch the division for Finals Matches
const matches = await event.matches(division.id, { type: [Round.Finals] });
matches.watch();

// When matches get generated
matches.on("add", match => {
    console.log(match);
});

// When matches get scored
matches.on("update", match => {
    console.log(match);
});

// Watch the for the event to be finalized
event.watch();

event.on("update", (key, current) => {
    if (key !== "awards_finalized" || !current) return;

    console.log("Awards finalized");
});

```

## API Reference

For options objects, refer to the [API documentation](https://robotevents.com/api/v2). These are strongly typed in TypeScript.

### Watching

All frequently updated structures support polling and updates using their `.watch()` method. This is either provided by `Watchable` for single objects (an event or team) or `WatchableCollection` for groups of objects (matches at an event, rankings, etc)

**`Watchable`**
Represents a single item that is commonly updated that is best represented as its own object. This includes `Event` and `Team`.

`.watch(frequency?: number = 30000)`

Starts polling RobotEvents for updates.

- `frequency` is the number of ms to poll between. Note that polls ignore cache

`.unwatch()`

Stops polling

`.on("update", (key, newValue, oldValue) => void)` Event triggered on update

---

**`WatchableCollection`**
Reprsents a group of items, which can be added to, removed from, or have a individual item in the collection updated.

> Note that `WatchableCollection` implements all [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) properties.

`.watch(frequency?: number = 30000)`

Starts polling RobotEvents for updates.

- `frequency` is the number of ms to poll between. Note that polls ignore cache

`.unwatch()`

Stops polling

`.on("add", (value) => void)` Event triggered when item is added to collection

`.on("remove", (value) => void)` Event triggered when item is removed from collection

`.on("update", (newValue, oldValue) => void)` Event triggered when item is updated
