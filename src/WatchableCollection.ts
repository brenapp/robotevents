/**
 * Creates a watchable collection,
 * basically an array of contents that can be passed .watch()
 * to watch for updates
 *
 * const teams = await event.teams()
 */

import { EventEmitter } from "events";

interface WatchableCollectionEvents<T> {
  add: (item: T) => void;
  remove: (item: T) => void;
}

export default interface WatchableCollection<T> {
  on<U extends keyof WatchableCollectionEvents<T>>(
    event: U,
    listener: WatchableCollectionEvents<T>[U]
  ): this;
  once<U extends keyof WatchableCollectionEvents<T>>(
    event: U,
    listener: WatchableCollectionEvents<T>[U]
  ): this;
  off<U extends keyof WatchableCollectionEvents<T>>(
    event: U,
    listener: WatchableCollectionEvents<T>[U]
  ): this;
}

export default class WatchableCollection<T> extends EventEmitter
  implements Set<T> {
  // Holds all of contents of the collection
  private contents: Set<T> = new Set<T>();

  // Polling config
  private check: () => Promise<T[]> | T[];
  private interval: NodeJS.Timeout | null = null;
  private frequency: number = 30 * 1000;
  polling = false;

  constructor(inital: Iterable<T>, check: () => Promise<T[]> | T[]) {
    super();

    this.contents = new Set(inital);
    this.check = check;
  }

  // Set methods

  /**
   * Adds a value to the collection
   * @param value
   */
  add(value: T) {
    this.contents.add(value);

    return this;
  }

  /**
   * Removes a value from the collection
   * @param value
   */
  delete(value: T) {
    return this.contents.delete(value);
  }

  /**
   * Clears the collection
   */
  clear() {
    this.contents.clear();
  }

  /**
   * Gets the current size of the collection
   */
  get size() {
    return this.contents.size;
  }

  has(item: T) {
    return this.contents.has(item);
  }

  /**
   * Iterates through all items in the collection
   * @param callback
   * @param thisArg
   */
  forEach(callback: (value: T, value2: T, set: Set<T>) => void, thisArg?: any) {
    return this.contents.forEach(callback, thisArg);
  }

  // Iteration
  *keys() {
    for (const item of this.contents) {
      yield item;
    }
  }
  values = this.keys;
  *entries() {
    for (const item of this.contents) {
      yield [item, item] as [T, T];
    }
  }

  [Symbol.iterator] = this.contents[Symbol.iterator].bind(this.contents);
  [Symbol.toStringTag] = "WatchableCollection";

  // Watching
  watch(frequency?: number) {
    this.polling = true;
    if (frequency) {
      this.frequency = frequency;
    }

    this.interval = setInterval(async () => {
      const batch = await this.check();
      const batchSet = new Set(batch);

      // Added items
      for (const item of batch) {
        if (this.has(item)) continue;

        this.add(item);
        this.emit("add", item);
      }

      // Removed Items
      for (const item of this) {
        if (batchSet.has(item)) continue;

        this.delete(item);
        this.emit("remove", item);
      }
    }, this.frequency);
  }

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
  static async create<T>(check: () => Promise<T[]> | T[]) {
    const inital = await check();
    return new WatchableCollection(inital, check);
  }
}
