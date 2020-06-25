/**
 * Creates a watchable collection,
 * basically an array of contents that can be passed .watch()
 * to watch for updates
 *
 * const teams = await event.teams()
 */
/// <reference types="node" />
import { EventEmitter } from "events";
interface WatchableCollectionEvents<T> {
    add: (item: T) => void;
    remove: (item: T) => void;
    update: (current: T, old: T) => void;
}
export default interface WatchableCollection<T> {
    on<U extends keyof WatchableCollectionEvents<T>>(event: U, listener: WatchableCollectionEvents<T>[U]): this;
    once<U extends keyof WatchableCollectionEvents<T>>(event: U, listener: WatchableCollectionEvents<T>[U]): this;
    off<U extends keyof WatchableCollectionEvents<T>>(event: U, listener: WatchableCollectionEvents<T>[U]): this;
}
export default class WatchableCollection<T extends {
    id: I;
}, I = number> extends EventEmitter implements Map<I, T> {
    private contents;
    private check;
    private interval;
    private frequency;
    polling: boolean;
    constructor(inital: [I, T][], check: () => Promise<T[]> | T[]);
    clear(): void;
    delete(id: I): boolean;
    get(id: I): T | undefined;
    has(id: I): boolean;
    set(id: I, value: T): this;
    get size(): number;
    forEach(callback: (value: T, key: I, map: Map<I, T>) => void): void;
    keys(): IterableIterator<I>;
    values(): IterableIterator<T>;
    entries(): IterableIterator<[I, T]>;
    [Symbol.iterator]: () => IterableIterator<[I, T]>;
    [Symbol.toStringTag]: string;
    watch(frequency?: number): void;
    unwatch(): void;
    /**
     * Creates a new watchable collection from a check function
     * @param check
     */
    static create<T extends {
        id: number;
    }>(check: () => Promise<T[]> | T[]): Promise<WatchableCollection<T, number>>;
}
export {};
