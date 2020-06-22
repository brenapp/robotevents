# RobotEvents

Full support for the [RobotEvents v2 API](https://www.robotevents.com/api/v2/)

Features

- Watch all constructs for changes
- Full Support for public RobotEvents v2 API
- Full Types
- Automatic Authentication
- Cache Management
- Automatic Ratelimiting

```
yarn add robotevents
```

```
npm install robotevents
```

## Basic Usage

This example will log all scored matches from an event and print when the event's awards are finalized

```TypeScript

import * as robotevents from "robotevents";

const event = await robotevents.events.get(process.env.SKU);

// Watch the 1st Division
const division = event.divisions[0];
console.log(`${event.name} on ${event.start} @ ${event.location.venue}`);
console.log(division.name);

// Watch the division for matches
const matches = await event.matches(division.id);
matches.watch();

// When matches get scored, update them
matches.on("add", match => {
    if (!match.scored) return;

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

https://robotevents.com/api/v2
