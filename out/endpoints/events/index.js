"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.Event = void 0;
var search_1 = __importDefault(require("./search"));
var request_1 = __importStar(require("../../util/request"));
var WatchableCollection_1 = __importDefault(require("../../WatchableCollection"));
var teams_1 = require("../teams");
var Watchable_1 = __importDefault(require("../../Watchable"));
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    // Load the event
    function Event(data) {
        var e_1, _a;
        var _this = 
        // Support watching
        _super.call(this, function () { return request_1.requestSingle("events/" + data.id, {}); }) || this;
        _this.id = 0;
        _this.sku = "";
        _this.name = "";
        _this.start = "";
        _this.end = "";
        _this.season = {
            id: 0,
            name: "",
            code: null,
        };
        _this.program = {
            id: 0,
            name: "",
            code: "",
        };
        _this.location = {
            venue: "",
            address_1: null,
            address_2: null,
            city: null,
            region: null,
            postcode: null,
            country: null,
            coordinates: {
                lat: "",
                lon: "",
            },
        };
        _this.divisions = [];
        _this.level = "Other";
        _this.ongoing = false;
        _this.awards_finalized = false;
        try {
            for (var _b = __values(Object.entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                // @ts-ignore
                _this[key] = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    // Watchable Collections
    /**
     * Gets teams at an event
     * @param options Search Options
     *
     * @example Basic Usage
     * const event = await robotevents.events.get(sku);
     * const teams = await event.teams();
     *
     * for (const team of teams) {
     *  console.log(team);
     * }
     *
     * @example Watch for Team Changes
     * teams.watch();
     *
     * teams.on("add", team => {
     *  console.log("Team added", team);
     * })
     *
     * teams.on("remove", team => {
     *  console.log("Team removed", team);
     * });
     *
     */
    Event.prototype.teams = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/teams", options, 0).then(function (teams) {
                return teams.map(function (data) { return new teams_1.Team(data); });
            });
        });
    };
    /**
     * Gets skills data at an event, as a watchable collection
     * @param options Skills Options
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const skills = await event.skills({
     *  type: ["driver"]
     * });
     *
     * for (const run of skills) {
     *  console.log(run);
     * }
     *
     * skills.watch();
     * skills.on("add", console.log)
     *
     */
    Event.prototype.skills = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/skills", options, 0);
        });
    };
    /**
     * Gets the awards for the event, returns a watchable collection
     * @param options Award Search Options
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const awards = await event.matches(1);
     *
     * for (const award of awards) {
     *  console.log(awards)
     * }
     *
     */
    Event.prototype.awards = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/awards", options, 0);
        });
    };
    /**
     * Gets the matches for an event, returns a watchable collection.
     *
     *
     * @example Scored Matches
     * const event = await robotevents.event(sku);
     * const matches = await event.matches(1); // Get current state of matches in Division 1
     * matches.watch();
     *
     * matches.on("add", match => {
     *  if (match.scored) {
     *    console.log("Match Scored", match)
     *  } else {
     *    console.log("Match Generated", match)
     *  }
     * })
     *
     *
     * @param division Division ID
     * @param options Match Search Options
     */
    Event.prototype.matches = function (division, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/divisions/" + division + "/matches", options, 0);
        });
    };
    /**
     *
     * @param division Division ID
     * @param options Ranking Search Options
     *
     * (VEX IQ only)
     * Gets the finalist rankings for an event
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const rankings = await event.finalistRankings(1, { rank: [1] });
     * rankings.watch();
     *
     * ranking.on("add", rank => {
     *  console.log("First Place Rank Update", rank);
     * });
     *
     *
     */
    Event.prototype.finalistRankings = function (division, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/divisions/" + division + "/finalistRankings", options, 0);
        });
    };
    /**
     *
     * @param division Division ID
     * @param options Ranking Search Options
     *
     *
     * @example
     * const event = await robotevents.events.get(sku);
     * const rankings = await event.rankings(1, { rank: [1] });
     * rankings.watch();
     *
     * ranking.on("add", rank => {
     *  console.log("First Place Rank Update", rank);
     * });
     *
     *
     */
    Event.prototype.rankings = function (division, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("events/" + _this.id + "/divisions/" + division + "/rankings", options, 0);
        });
    };
    return Event;
}(Watchable_1.default));
exports.Event = Event;
function get(skuOrID) {
    return __awaiter(this, void 0, void 0, function () {
        var events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    events = [];
                    if (!(typeof skuOrID == "string")) return [3 /*break*/, 2];
                    return [4 /*yield*/, search_1.default({ sku: [skuOrID] })];
                case 1:
                    events = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!typeof skuOrID) return [3 /*break*/, 4];
                    return [4 /*yield*/, search_1.default({ id: [skuOrID] })];
                case 3:
                    events = _a.sent();
                    _a.label = 4;
                case 4:
                    if (events.length < 1) {
                        return [2 /*return*/, Promise.reject(new Error("No event with SKU/ID " + skuOrID))];
                    }
                    return [2 /*return*/, new Event(events[0])];
            }
        });
    });
}
exports.get = get;
var search_2 = require("./search");
Object.defineProperty(exports, "search", { enumerable: true, get: function () { return search_2.default; } });
//# sourceMappingURL=index.js.map