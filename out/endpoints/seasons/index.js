"use strict";
/**
 * Season Management in RobotEvents
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = exports.get = exports.years = exports.getEvents = exports.all = exports.fetch = void 0;
var request_1 = __importDefault(require("../../util/request"));
var events_1 = require("../events");
function fetch(id) {
    return __awaiter(this, void 0, void 0, function () {
        var seasons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request_1.default("seasons", {
                        id: id,
                    })];
                case 1:
                    seasons = _a.sent();
                    if (seasons.length < 1) {
                        return [2 /*return*/, Promise.reject(new Error("No season with id " + id))];
                    }
                    return [2 /*return*/, seasons[0]];
            }
        });
    });
}
exports.fetch = fetch;
function all() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request_1.default("seasons", {})];
        });
    });
}
exports.all = all;
function getEvents(season, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, request_1.default("seasons/" + season + "/events", options).then(function (response) { return response.map(function (data) { return new events_1.Event(data); }); })];
        });
    });
}
exports.getEvents = getEvents;
exports.years = [
    "2020-2021",
    "2019-2020",
    "2018-2019",
    "2017-2018",
    "2016-2017",
    "2015-2016",
    "2014-2015",
    "2013-2014",
    "2012-2013",
    "2011-2012",
    "2010-2011",
    "2009-2010",
];
// All of the season IDs
var seasons = {
    "VAIC-HS": {
        "2020-2021": 145,
    },
    "VAIC-U": {
        "2020-2021": 147,
    },
    CREATE: {
        "2020-2021": 146,
        "2019-2020": 132,
        "2018-2019": 127,
        "2017-2018": 122,
        "2016-2017": 117,
        "2015-2016": 112,
        "2014-2015": 104,
        "2013-2014": 94,
        "2012-2013": 91,
        "2011-2012": 79,
    },
    WORKSHOP: {
        "2020-2021": 118,
        "2019-2020": 113,
        "2018-2019": 107,
        "2017-2018": 98,
    },
    VIQC: {
        "2020-2021": 138,
        "2019-2020": 129,
        "2018-2019": 124,
        "2017-2018": 121,
        "2016-2017": 114,
        "2015-2016": 109,
        "2014-2015": 101,
        "2013-2014": 96,
    },
    VRC: {
        "2020-2021": 139,
        "2019-2020": 130,
        "2018-2019": 125,
        "2017-2018": 119,
        "2016-2017": 115,
        "2015-2016": 110,
        "2014-2015": 102,
        "2013-2014": 92,
        "2012-2013": 85,
        "2011-2012": 73,
        "2010-2011": 7,
        "2009-2010": 1,
    },
    VEXU: {
        "2020-2021": 140,
        "2019-2020": 131,
        "2018-2019": 126,
        "2017-2018": 120,
        "2016-2017": 116,
        "2015-2016": 111,
        "2014-2015": 103,
        "2013-2014": 93,
        "2012-2013": 88,
        "2011-2012": 76,
        "2010-2011": 10,
        "2009-2010": 4,
    },
    DIS: {
        "2020-2021": 143,
        "2019-2020": 133,
        "2018-2019": 128,
    },
    NRL: {
        "2019-2020": 137,
    },
    RAD: {
        "2020-2021": 144,
        "2019-2020": 134,
    },
    TVCR: {
        "2020-2021": 142,
        "2019-2020": 136,
    },
    TIQC: {
        "2020-2021": 141,
        "2019-2020": 135,
    },
};
/**
 * Gets the Season ID for a given program and year
 * @param program Program
 * @param year Year
 */
function get(program, year) {
    return seasons[program][year];
}
exports.get = get;
/**
 * Gets the current season for the given  program
 * @param program Program
 */
function current(program) {
    return seasons[program]["2020-2021"];
}
exports.current = current;
//# sourceMappingURL=index.js.map