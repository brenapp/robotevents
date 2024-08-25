# RobotEvents
Module that enables you to interact with the [RobotEvents API](https://www.robotevents.com/api/v2).

## Basic Usage

```typescript
import { Client } from "robotevents"

const client = Client({
    authorization: { token: "<AUTH TOKEN>" }
});

const result = await client.programs.get(programs.V5RC);

if (result.error) {
    console.log(result.response.statusText)
};

console.log(result.data);

const events = await client.events.search({ "sku[]": ["RE-VRC-23-1488"] });
console.log(events.data);

if (result.error) {
    console.log(result.response.statusText)
};

console.log(result.data);

```

