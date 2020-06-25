/**
 * Makes a class Watchable
 *
 * For example, allows you to moniter events for updates
 *
 */
/// <reference types="node" />
import { EventEmitter } from "events";
export declare type Get<T> = () => Promise<T> | T;
interface WatchableEvents<T, I extends keyof T = keyof T> {
    update: (key: I, current: T[I], old: T[I]) => void;
}
interface Watchable<T> {
    on<U extends keyof WatchableEvents<T>>(event: U, listener: WatchableEvents<T>[U]): this;
    once<U extends keyof WatchableEvents<T>>(event: U, listener: WatchableEvents<T>[U]): this;
    off<U extends keyof WatchableEvents<T>>(event: U, listener: WatchableEvents<T>[U]): this;
}
declare abstract class Watchable<T> extends EventEmitter {
    check: Get<T>;
    watchable: boolean;
    frequency: number;
    interval: NodeJS.Timeout | null;
    polling: boolean;
    constructor(check: Get<T>);
    watch(frequency?: number): void;
    unwatch(): void;
}
export default Watchable;
