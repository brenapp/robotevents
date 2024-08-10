/**
 * Creates a watchable collection,
 * basically an array of contents that can be passed .watch()
 * to watch for updates
 *
 * const teams = await event.teams();
 * teams.watch();
 *
 * teams.on("changed", teams => {
 *  const regions = teams.group(team => team.location.region);
 * });
 *
 */
import { EventEmitter } from "events";

interface WatchableCollectionEvents<T extends { id: I }, I> {
  add: (item: T) => void;
  remove: (item: T) => void;
  update: (current: T, old: T) => void;
  changed: (self: WatchableCollection<T, I>) => void;
}

export default interface WatchableCollection<T extends { id: I }, I> {
  on<U extends keyof WatchableCollectionEvents<T, I>>(
    event: U,
    listener: WatchableCollectionEvents<T, I>[U]
  ): this;
  once<U extends keyof WatchableCollectionEvents<T, I>>(
    event: U,
    listener: WatchableCollectionEvents<T, I>[U]
  ): this;
  off<U extends keyof WatchableCollectionEvents<T, I>>(
    event: U,
    listener: WatchableCollectionEvents<T, I>[U]
  ): this;
}

type CheckFunction<T extends { id: I }, I> = (
  self: WatchableCollection<T, I>
) => Promise<T[]> | T[];

export default class WatchableCollection<
  T extends { id: I },
  I = number,
> extends EventEmitter {
  // Holds all of contents of the collection
  private contents: Map<I, T> = new Map<I, T>();

  // Polling config
  private check: CheckFunction<T, I>;
  private interval: NodeJS.Timeout | null = null;
  private frequency: number = 30 * 1000;
  polling = false;

  constructor(initial: [I, T][], check: CheckFunction<T, I>) {
    super();

    this.contents = new Map(initial);
    this.check = check;
  }

  // Map methods

  /**
   * Empties the contents of the collection
   */
  clear() {
    this.contents.clear();
  }

  /**
   * Deletes a specific ID from the collection
   * @param id ID to delete
   */
  delete(id: I) {
    if (!this.contents.has(id)) {
      return false;
    }

    this.emit("remove", this.contents.get(id) as T);
    this.emit("changed", this);
    return this.contents.delete(id);
  }

  /**
   * Gets a certain ID from the collection
   * @param id
   */
  get(id: I) {
    return this.contents.get(id);
  }

  /**
   * Checks if the collection contains an item with the given ID
   * @param id
   */
  has(id: I) {
    return this.contents.has(id);
  }

  /**
   * Sets a specific value in the collection
   * @param id
   * @param value
   */
  set(id: I, value: T) {
    if (this.contents.has(id)) {
      this.emit("update", value, this.contents.get(id) as T);
      this.emit("changed", this);
    } else {
      this.emit("add", value);
      this.emit("changed", this);
    }

    this.contents.set(id, value);
    return this;
  }

  /**
   * Gets the number of items in the collection
   */
  get size() {
    return this.contents.size;
  }

  /**
   * Iterates through all items in the collection, calling the passed
   *
   * @example
   * const events = await team.events();
   * events.forEach((event, id, collection) => console.log(id, event))
   *
   * @param callback Callback function
   */
  forEach(
    callback: (value: T, key: I, collection: WatchableCollection<T, I>) => void
  ) {
    this.contents.forEach((value, key) => callback(value, key, this));
  }

  /**
   * Returns an iterator with all of the IDs in the collection
   *
   * @example
   * const events = await team.events();
   *
   * for (const id of events.keys()) {
   *  console.log(id);
   * }
   *
   */
  keys() {
    return this.contents.keys();
  }

  /**
   * Returns an iterator with all the items in the collection
   *
   * @example
   * const events = await team.events();
   *
   * for (const event of events.values()) {
   *  console.log(event);
   * }
   *
   */
  values() {
    return this.contents.values();
  }

  /**
   * Returns an entries iterator like [id, value] for the items in the collection
   *
   * @example
   * const events = await team.events();
   *
   * for (const [id, event] of events.entries()) {
   *  console.log(id, event.id)
   * }
   */
  entries() {
    return this.contents.entries();
  }

  /**
   * Default iterator for the collection. Same as WatchableCollection#values
   *
   * @example
   *
   * const events = await team.events();
   * for (const event of events) {
   *  console.log(event);
   * }
   */
  [Symbol.iterator] = this.values;

  // Other utility methods

  /**
   * Returns an array of the values in the collection
   *
   * @example
   * const events = await team.events();
   *
   * events.array().forEach(console.log);
   *
   */
  array(): T[] {
    return [...this.contents.values()];
  }

  /**
   * Returns an array of the IDs of the collection
   *
   * @example
   * const events = await team.events();
   *
   * events.idArray().forEach(console.log)
   */
  idArray(): I[] {
    return [...this.contents.keys()];
  }

  /**
   * Looks for an item in the collection
   *
   * @example
   * const events = await team.events();
   *
   * const event = events.find((event, id, collection) => event.name.startsWith("Signature Event")));
   *
   * @param predicate Search function
   */
  find(
    predicate: (
      item: T,
      id: I,
      collection: WatchableCollection<T, I>
    ) => boolean
  ): T | undefined {
    for (const [id, item] of this.contents) {
      if (predicate(item, id, this)) {
        return item;
      }
    }

    return undefined;
  }

  /**
   * Checks if some of the elements in the collection pass the criterion
   *
   * @example
   * const events = await team.events();
   *
   * const wentToSig = events.some((event, id, collection) => event.name.includes("Signature Event")));
   *
   * if (wentToSig) {
   *  console.log("Went to a signature event");
   * } else {
   *  console.log("Did not go to a signature event")
   * }
   *
   * @param predicate
   */
  some(
    predicate: (
      item: T,
      id: I,
      collection: WatchableCollection<T, I>
    ) => boolean
  ) {
    for (const [id, item] of this.contents) {
      if (predicate(item, id, this)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if every singe one of the elements in the collection pass the criterion
   *
   * @example
   * const teams = await event.teams();
   *
   * const isLocalOnlyEvent = teams.every(team => team.location.region === event.location.region);
   *
   *
   * @param predicate
   */
  every(
    predicate: (
      item: T,
      id: I,
      collection: WatchableCollection<T, I>
    ) => boolean
  ) {
    for (const [id, item] of this.contents) {
      if (!predicate(item, id, this)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Group the current contents of the WatchableCollection into a object by the discriminator function.
   *
   * @example
   * const event = robotevents.events.get(sku);
   * const matches = event.matches();
   *
   * const rounds = matches.group(match => match.round);
   * console.log(rounds[Round.RoundOf16]);
   *
   * @param discriminator Function used to sort the objects of the collection into groups
   */
  group<K extends string | number | symbol>(
    discriminator: (item: T, id: I, collection: WatchableCollection<T, I>) => K
  ): Partial<Record<K, T[]>> {
    let result = Object.create(null) as Partial<Record<K, T[]>>;

    for (const [id, item] of this.contents) {
      const key = discriminator(item, id, this);

      if (key in result) {
        result[key]?.push(item);
      } else {
        result[key] = [item];
      }
    }

    return result;
  }

  /**
   * Group the current contents of the WatchableCollection into a map by the discriminator function.
   * Different from WatchableCollection#group, this method returns a Map so the return values can be
   * anything that can be used as a key in a Map.
   *
   * @param discriminator Function used to sort the objects of the collection into groups
   * @returns Map of the grouped items
   */
  groupToMap<K>(
    discriminator: (item: T, id: I, collection: WatchableCollection<T, I>) => K
  ): Map<K, T[]> {
    let result = new Map<K, T[]>();

    for (const [id, item] of this.contents) {
      const key = discriminator(item, id, this);

      if (result.has(key)) {
        result.set(key, [...result.get(key)!, item]);
      } else {
        result.set(key, [item]);
      }
    }

    return result;
  }

  // Watching

  /**
   * Stops polling the resource for updates
   *
   * @example
   * const events = await team.events();
   *
   * events.watch(10 * 1000); // Check every 10 seconds instead
   *
   * event.on("add", (event) => {
   *  console.log(event);
   * });
   *
   * @param frequency How often to poll for new results, defaults to 30,000 ms
   *
   */
  watch(frequency?: number) {
    this.polling = true;
    if (frequency) {
      this.frequency = frequency;
    }

    this.interval = setInterval(async () => {
      const current = new Map(makeMappable<T, I>(await this.check(this)));

      // Check for new and updated items
      for (const [id, value] of current) {
        if (!this.contents.has(id)) {
          this.set(id, value);
          continue;
        }

        const old = this.contents.get(id) as T;

        if (!deepEquals(value, old)) {
          this.set(id, value);
        }
      }

      // Check for removed values
      for (const [id, value] of this.contents) {
        if (current.has(id)) continue;

        this.delete(id);
      }
    }, this.frequency);
  }

  /**
   * Stops polling the resource for updates
   *
   * @example
   * const events = await team.events();
   *
   * events.watch(10 * 1000); // Check every 10 seconds instead
   *
   * event.on("add", (event) => {
   *  console.log(event);
   * });
   *
   * event.unwatch(); // Stop watching for updates
   *
   */
  unwatch() {
    if (!this.polling || !this.interval) {
      return;
    }

    clearInterval(this.interval);
  }

  /**
   * Creates a new watchable collection from a check function
   * @param check
   */
  static async create<T extends { id: number }>(
    check: () => Promise<T[]> | T[]
  ) {
    const inital = makeMappable(await check());
    return new WatchableCollection(inital, check);
  }
}

function makeMappable<T extends { id: I }, I = number>(values: T[]): [I, T][] {
  return Object.entries(values).map(([i, value]) => [value.id, value]);
}

export function deepEquals(a: object, b: object): boolean {
  for (const [key, value] of Object.entries(a)) {
    if (!b.hasOwnProperty(key)) return false;
    const compare = (b as any)[key];

    switch (typeof compare) {
      case "object": {
        return deepEquals(value, compare);
      }

      default: {
        if (value !== compare) return false;
      }
    }
  }
  return true;
}
