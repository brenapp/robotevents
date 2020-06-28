"use strict";
/**
 * Creates a watchable collection,
 * basically an array of contents that can be passed .watch()
 * to watch for updates
 *
 * const teams = await event.teams()
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var WatchableCollection = /** @class */ (function (_super) {
    __extends(WatchableCollection, _super);
    function WatchableCollection(inital, check) {
        var _this = _super.call(this) || this;
        // Holds all of contents of the collection
        _this.contents = new Map();
        _this.interval = null;
        _this.frequency = 30 * 1000;
        _this.polling = false;
        _this[Symbol.iterator] = _this.entries;
        _this[Symbol.toStringTag] = "WatchableCollection";
        _this.contents = new Map(inital);
        _this.check = check;
        return _this;
    }
    // Map methods
    WatchableCollection.prototype.clear = function () {
        this.contents.clear();
    };
    WatchableCollection.prototype.delete = function (id) {
        if (!this.contents.has(id)) {
            return false;
        }
        this.emit("remove", this.contents.get(id));
        return this.contents.delete(id);
    };
    WatchableCollection.prototype.get = function (id) {
        return this.contents.get(id);
    };
    WatchableCollection.prototype.has = function (id) {
        return this.contents.has(id);
    };
    WatchableCollection.prototype.set = function (id, value) {
        if (this.contents.has(id)) {
            this.emit("update", value, this.contents.get(id));
        }
        else {
            this.emit("add", value);
        }
        this.contents.set(id, value);
        return this;
    };
    Object.defineProperty(WatchableCollection.prototype, "size", {
        get: function () {
            return this.contents.size;
        },
        enumerable: false,
        configurable: true
    });
    WatchableCollection.prototype.forEach = function (callback) {
        this.contents.forEach(callback);
    };
    WatchableCollection.prototype.keys = function () {
        return this.contents.keys();
    };
    WatchableCollection.prototype.values = function () {
        return this.contents.values();
    };
    WatchableCollection.prototype.entries = function () {
        return this.contents.entries();
    };
    // Other utility methods
    WatchableCollection.prototype.array = function () {
        return __spread(this.contents.values());
    };
    WatchableCollection.prototype.idArray = function () {
        return __spread(this.contents.keys());
    };
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
    WatchableCollection.prototype.filter = function (predicate) {
        var e_1, _a;
        var _this = this;
        var inital = [];
        try {
            for (var _b = __values(this.contents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], item = _d[1];
                if (predicate(item, id, this)) {
                    inital.push([id, item]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Filtered check
        var check = function (collection) {
            return Promise.resolve(_this.check(_this)).then(function (runs) {
                return runs.filter(function (run) { return predicate(run, run.id, collection); });
            });
        };
        return new WatchableCollection(inital, check);
    };
    /**
     * Looks for an item in the collection
     * @param predicate
     */
    WatchableCollection.prototype.find = function (predicate) {
        var e_2, _a;
        try {
            for (var _b = __values(this.contents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], item = _d[1];
                if (predicate(item, id, this)) {
                    return item;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
    };
    /**
     * Checks if some of the elements in the collection pass the criterion
     * @param predicate
     */
    WatchableCollection.prototype.some = function (predicate) {
        var e_3, _a;
        try {
            for (var _b = __values(this.contents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], item = _d[1];
                if (predicate(item, id, this)) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
    };
    /**
     * Checks if every singe one of the elements in the collection pass the criterion
     * @param predicate
     */
    WatchableCollection.prototype.every = function (predicate) {
        var e_4, _a;
        try {
            for (var _b = __values(this.contents), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], item = _d[1];
                if (!predicate(item, id, this)) {
                    return false;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return true;
    };
    // Watching
    WatchableCollection.prototype.watch = function (frequency) {
        var _this = this;
        this.polling = true;
        if (frequency) {
            this.frequency = frequency;
        }
        this.interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var current, _a, _b, current_1, current_1_1, _c, id, value, old, _d, _e, _f, id, value;
            var e_5, _g, e_6, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _a = Map.bind;
                        _b = makeMappable;
                        return [4 /*yield*/, this.check(this)];
                    case 1:
                        current = new (_a.apply(Map, [void 0, _b.apply(void 0, [_j.sent()])]))();
                        try {
                            // Check for new and updated items
                            for (current_1 = __values(current), current_1_1 = current_1.next(); !current_1_1.done; current_1_1 = current_1.next()) {
                                _c = __read(current_1_1.value, 2), id = _c[0], value = _c[1];
                                if (!this.contents.has(id)) {
                                    this.set(id, value);
                                    continue;
                                }
                                old = this.contents.get(id);
                                if (!eq(value, old)) {
                                    this.set(id, value);
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (current_1_1 && !current_1_1.done && (_g = current_1.return)) _g.call(current_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        try {
                            // Check for removed values
                            for (_d = __values(this.contents), _e = _d.next(); !_e.done; _e = _d.next()) {
                                _f = __read(_e.value, 2), id = _f[0], value = _f[1];
                                if (current.has(id))
                                    continue;
                                this.delete(id);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        return [2 /*return*/];
                }
            });
        }); }, this.frequency);
    };
    WatchableCollection.prototype.unwatch = function () {
        if (!this.polling || !this.interval) {
            return;
        }
        clearInterval(this.interval);
    };
    /**
     * Creates a new watchable collection from a check function
     * @param check
     */
    WatchableCollection.create = function (check) {
        return __awaiter(this, void 0, void 0, function () {
            var inital, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = makeMappable;
                        return [4 /*yield*/, check()];
                    case 1:
                        inital = _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/, new WatchableCollection(inital, check)];
                }
            });
        });
    };
    return WatchableCollection;
}(events_1.EventEmitter));
exports.default = WatchableCollection;
function makeMappable(values) {
    return Object.entries(values).map(function (_a) {
        var _b = __read(_a, 2), i = _b[0], value = _b[1];
        return [value.id, value];
    });
}
function eq(a, b) {
    var e_7, _a;
    try {
        for (var _b = __values(Object.entries(a)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (!b.hasOwnProperty(key))
                return false;
            var compare = b[key];
            switch (typeof compare) {
                case "object": {
                    return eq(value, compare);
                }
                default: {
                    if (value !== compare)
                        return false;
                }
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return true;
}
//# sourceMappingURL=WatchableCollection.js.map