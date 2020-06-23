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
  update: (current: T, old: T) => void;
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

export default class WatchableCollection<T extends { id: I }, I = number>
  extends EventEmitter
  implements Map<I, T> {
  // Holds all of contents of the collection
  private contents: Map<I, T> = new Map<I, T>();

  // Polling config
  private check: () => Promise<T[]> | T[];
  private interval: NodeJS.Timeout | null = null;
  private frequency: number = 30 * 1000;
  polling = false;

  constructor(inital: [I, T][], check: () => Promise<T[]> | T[]) {
    super();

    this.contents = new Map(inital);
    this.check = check;
  }

  // Map methods

  clear() {
    this.contents.clear();
  }

  delete(id: I) {
    if (!this.contents.has(id)) {
      throw new Error(
        `WatchableCollection does not contain item with id ${id}`
      );
    }

    this.emit("remove", id, this.contents.get(id) as T);
    return this.contents.delete(id);
  }

  get(id: I) {
    return this.contents.get(id);
  }

  has(id: I) {
    return this.contents.has(id);
  }

  set(id: I, value: T) {
    if (this.contents.has(id)) {
      this.emit("update", value, this.contents.get(id) as T);
    } else {
      this.emit("add", value);
    }

    this.contents.set(id, value);
    return this;
  }

  get size() {
    return this.contents.size;
  }

  forEach(callback: (value: T, key: I, map: Map<I, T>) => void) {
    this.contents.forEach(callback);
  }

  keys() {
    return this.contents.keys();
  }
  values() {
    return this.contents.values();
  }
  entries() {
    return this.contents.entries();
  }

  [Symbol.iterator] = this.entries;
  [Symbol.toStringTag] = "WatchableCollection";

  // Watching
  watch(frequency?: number) {
    this.polling = true;
    if (frequency) {
      this.frequency = frequency;
    }

    this.interval = setInterval(async () => {
      const current = new Map(makeMappable<T, I>(await this.check()));

      // Check for new and updated items
      for (const [id, value] of current) {
        if (!this.contents.has(id)) {
          this.set(id, value);
          continue;
        }

        const old = this.contents.get(id) as T;

        if (!eq(value, old)) {
          this.set(id, value);
        }
      }

      // Check for removed values
      for (const [id, value] of this.contents) {
        if (current.has(id)) continue;

        this.contents.delete(id);
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

function eq(a: object, b: object): boolean {
  for (const [key, value] of Object.entries(a)) {
    if (!b.hasOwnProperty(key)) return false;
    const compare = (b as any)[key];

    switch (typeof compare) {
      case "object": {
        return eq(value, compare);
      }

      default: {
        if (value !== compare) return false;
      }
    }
  }
  return true;
}
