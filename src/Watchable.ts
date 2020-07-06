/**
 * Makes a class Watchable
 *
 * For example, allows you to moniter events for updates
 *
 */

import { EventEmitter } from "events";

export type Get<T> = () => Promise<T> | T;

interface WatchableEvents<T, I extends keyof T = keyof T> {
  update: (key: I, current: T[I], old: T[I]) => void;
}

interface Watchable<T> {
  on<U extends keyof WatchableEvents<T>>(
    event: U,
    listener: WatchableEvents<T>[U]
  ): this;
  once<U extends keyof WatchableEvents<T>>(
    event: U,
    listener: WatchableEvents<T>[U]
  ): this;
  off<U extends keyof WatchableEvents<T>>(
    event: U,
    listener: WatchableEvents<T>[U]
  ): this;
}

abstract class Watchable<T> extends EventEmitter {
  check: Get<T>;
  frequency: number = 30 * 1000;
  interval: NodeJS.Timeout | null = null;
  polling = false;

  constructor(check: Get<T>) {
    super();
    this.check = check;
  }

  /**
   * Starts watching this resource for updates. Will emit "update" when a key changes.
   *
   * @example
   * const event = await robotevents.events.get(id);
   *
   * event.watch(10 * 1000); // Check every 10 seconds instead
   *
   * event.on("update", (key, current, old) => {
   *  console.log(`${key}: ${old} -> ${current}`);
   * });
   *
   * @param frequency Frequency to check record for update in ms, defaults to 30 000
   */
  watch(frequency?: number) {
    if (frequency) {
      this.frequency = frequency;
    }

    this.polling = true;

    this.interval = setInterval(async () => {
      if (!this.check) return;

      const state = await this.check();

      for (const [key, value] of Object.entries(state)) {
        // @ts-ignore
        const current = JSON.stringify(this[key]);
        const updated = JSON.stringify(value);

        if (current !== updated) {
          this.emit("update", key, updated, current);
        }
      }
    }, this.frequency);
  }

  /**
   * Stops polling the resource for updates
   *
   * @example
   * const event = await robotevents.events.get(id);
   *
   * event.watch(10 * 1000); // Check every 10 seconds instead
   *
   * event.on("update", (key, current, old) => {
   *  console.log(`${key}: ${old} -> ${current}`);
   * });
   *
   * event.unwatch(); // Stop watching for updates
   *
   */
  unwatch() {
    this.polling = false;

    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export default Watchable;
