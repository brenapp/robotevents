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
exports.get = exports.Team = void 0;
var Watchable_1 = __importDefault(require("../../Watchable"));
var request_1 = __importStar(require("../../util/request"));
var WatchableCollection_1 = __importDefault(require("../../WatchableCollection"));
var events_1 = require("../events");
var search_1 = require("./search");
var main_1 = require("../../main");
var Team = /** @class */ (function (_super) {
    __extends(Team, _super);
    function Team(data) {
        var e_1, _a;
        var _this = _super.call(this, function () {
            return request_1.requestSingle("teams/" + data.id, { id: [data.id] }, 0);
        }) || this;
        // Team Data
        _this.id = 0;
        _this.number = "";
        _this.team_name = "";
        _this.robot_name = "";
        _this.organization = "";
        _this.location = {
            venue: null,
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
        _this.registered = false;
        _this.program = { id: 0, name: "", code: "" };
        _this.grade = "High School";
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
     * Gets all events the team has gone to
     * @param options Event Options
     *
     * @example
     * const team = await robotevents.teams.get(number);
     * const events = await team.events({
     *  level: ["State", "National", "Signature"]
     * });
     *
     * for (const event of events) {
     *  console.log(event);
     * }
     *
     */
    Team.prototype.events = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("teams/" + _this.id + "/events", options, 0).then(function (response) { return response.map(function (data) { return new events_1.Event(data); }); });
        });
    };
    /**
     * Gets all matches for the team
     * @param options
     *  @param options.event Event IDs
     *  @param options.season Season IDs
     *  @param options.rounds Possible match rounds to search
     *  @param options.instance Possible match instances to search
     *  @param options.matchnum Possible match numbers to search
     *
     * @example
     * const team = await robotevents.teams.get(number);
     * const matches = await team.matches();
     * matches.watch();
     *
     * matches.on("add", match => {
     *  console.log("Match generated")
     * })
     *
     */
    Team.prototype.matches = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("teams/" + _this.id + "/matches", options, 0);
        });
    };
    /**
     * Gets a team's rankings
     * @param options Ranking Options
     *  @param options.event Event IDs
     *  @param options.rank Possible ranks to search for
     *  @param options.season Season IDs
     */
    Team.prototype.rankings = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("teams/" + _this.id + "/rankings", options, 0);
        });
    };
    /**
     * Gets a team's skills runs
     * @param options Skills Run Options
     *  @param options.event Event IDs to filter
     *  @param options.type Possible skills run types ("driver" or "programming")
     *  @param options.season Season IDs
     */
    Team.prototype.skills = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("teams/" + _this.id + "/skills", options, 0);
        });
    };
    /**
     * Gets a team's awards
     * @param options Awards Options
     *  @param options.event Event IDs to filter by
     *  @param options.season Season IDs to filter by
     */
    Team.prototype.awards = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return WatchableCollection_1.default.create(function () {
            return request_1.default("teams/" + _this.id + "/awards", options, 0);
        });
    };
    return Team;
}(Watchable_1.default));
exports.Team = Team;
/**
 * Gets a registered team by their ID or Team Number
 *
 * Note: Multiple "teams" can have the same team number, as team numbers are only exclusive the program.
 * For example, a Middle School team may participate in both VIQC and VRC, and therefore searching for
 * their number will result in two results. Or a team participating in both VAIC-HS and VRC may have the
 * same team number for both teams.
 *
 * In order to rectify this conclusion, you can specify an optional ProgramAbbr in the get method to specify
 * which program you are referring to. If this is not specified, then the first result will be used
 *
 * @param numberOrID
 */
function get(numberOrID, abbr) {
    return __awaiter(this, void 0, void 0, function () {
        var teams, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teams = [];
                    if (!(typeof numberOrID == "string")) return [3 /*break*/, 2];
                    params = { number: [numberOrID] };
                    if (abbr && main_1.programs.get(abbr)) {
                        params["program"] = [main_1.programs.get(abbr)];
                    }
                    return [4 /*yield*/, search_1.search(params)];
                case 1:
                    teams = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!typeof numberOrID) return [3 /*break*/, 4];
                    return [4 /*yield*/, search_1.search({ id: [numberOrID] })];
                case 3:
                    teams = _a.sent();
                    _a.label = 4;
                case 4:
                    if (teams.length < 1) {
                        return [2 /*return*/, Promise.reject(new Error("No team with Number/ID" + numberOrID + " " + (abbr ? " in program " + abbr : "")))];
                    }
                    return [2 /*return*/, teams[0]];
            }
        });
    });
}
exports.get = get;
var search_2 = require("./search");
Object.defineProperty(exports, "search", { enumerable: true, get: function () { return search_2.search; } });
//# sourceMappingURL=index.js.map