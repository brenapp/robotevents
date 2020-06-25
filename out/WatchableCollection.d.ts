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
declare type CheckFunction<T extends {
    id: I;
}, I> = (self: WatchableCollection<T, I>) => Promise<T[]> | T[];
export default class WatchableCollection<T extends {
    id: I;
}, I = number> extends EventEmitter implements Map<I, T> {
    private contents;
    private check;
    private interval;
    private frequency;
    polling: boolean;
    constructor(inital: [I, T][], check: CheckFunction<T, I>);
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
    array(): T[];
    idArray(): I[];
    /**
     * Returns a new WatchableCollection of the items which pass the filter.
     * Note this collection is watchable, and watch events will only be triggered for items that fit the filter function.
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const skills = (await event.skills()).filter(run => run.score > 30);
     *
     * skills.watch();
     * skills.on("add", run => console.log("New run over 30pts", run));
     *
     * @param predicate
     */
    filter(predicate: (item: T, id: I, collection: WatchableCollection<T, I>) => boolean): WatchableCollection<T, I>;
    /**
     * Looks for an item in the collection
     * @param predicate
     */
    find(predicate: (item: T, id: I, collection: WatchableCollection<T, I>) => boolean): T | undefined;
    /**
     * Checks if some of the elements in the collection pass the criterion
     * @param predicate
     */
    some(predicate: (item: T, id: I, collection: WatchableCollection<T, I>) => boolean): boolean;
    /**
     * Checks if every singe one of the elements in the collection pass the criterion
     * @param predicate
     */
    every(predicate: (item: T, id: I, collection: WatchableCollection<T, I>) => boolean): boolean;
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
