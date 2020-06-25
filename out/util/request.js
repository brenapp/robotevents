"use strict";
/**
 * Makes a ratelimit respecting request to the robotevents API,
 * supporting caching using keya
 *
 * Every minute, you are allowed to make 1080 requests,
 * this module will automatically queue requests to ensure
 * that ratelimiting is obeyed
 *
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSingle = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var keya = __importStar(require("keya"));
var ratelimit_1 = require("./ratelimit");
var authentication_1 = require("./authentication");
/**
 * Serializes parameters into a string to be passed to the API
 * @param params RobotEventsRequest
 */
function serialize(params) {
    var e_1, _a, e_2, _b;
    var body = "";
    try {
        for (var _c = __values(Object.entries(params)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
            switch (typeof value) {
                // Normal passed parameters can be serialized as normal
                case "string":
                case "number":
                    body += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
                    break;
                // Arrays need to have all of their components added seperately
                case "object": {
                    try {
                        for (var value_1 = (e_2 = void 0, __values(value)), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                            var v = value_1_1.value;
                            body += encodeURIComponent(key) + "[]=" + encodeURIComponent(v) + "&";
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    break;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Remove the last amperstand and return
    return body.slice(0, body.length - 1);
}
function doRequest(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!authentication_1.ok()) return [3 /*break*/, 2];
                    return [4 /*yield*/, authentication_1.basic()];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2: 
                // Wait for the ratelimit to be clear (resolves immediately if ok)
                return [4 /*yield*/, ratelimit_1.ready()];
                case 3:
                    // Wait for the ratelimit to be clear (resolves immediately if ok)
                    _c.sent();
                    return [4 /*yield*/, node_fetch_1.default(url.href, {
                            headers: {
                                cookie: authentication_1.COOKIE,
                            },
                            redirect: "manual",
                        })];
                case 4:
                    response = _c.sent();
                    if (!(response.status === 302)) return [3 /*break*/, 6];
                    return [4 /*yield*/, authentication_1.basic()];
                case 5:
                    _c.sent();
                    return [2 /*return*/, doRequest(url)];
                case 6:
                    // Set the new ratelimit
                    if (response.headers.has("x-ratelimit-remaining")) {
                        ratelimit_1.updateCurrent(parseInt(response.headers.get("x-ratelimit-remaining")));
                    }
                    if (!!response.ok) return [3 /*break*/, 8];
                    _b = (_a = Promise).reject;
                    return [4 /*yield*/, response.text()];
                case 7: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 8: return [2 /*return*/, response.json()];
            }
        });
    });
}
function request(endpoint, params, maxAge) {
    if (maxAge === void 0) { maxAge = Infinity; }
    return __awaiter(this, void 0, void 0, function () {
        var store, url, cached, age, page, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, keya.store("robotevents")];
                case 1:
                    store = _a.sent();
                    url = new URL(endpoint, "https://www.robotevents.com/api/v2/");
                    // Add the (custom seralized) search params to support the custom array behavior of the API
                    url.search = serialize(__assign({ per_page: 250 }, params));
                    return [4 /*yield*/, store.get(decodeURI(url.href))];
                case 2:
                    cached = _a.sent();
                    if (cached) {
                        age = Date.now() - cached.created;
                        if (age <= maxAge) {
                            return [2 /*return*/, cached.value];
                        }
                    }
                    return [4 /*yield*/, doRequest(url)];
                case 3:
                    page = _a.sent();
                    data = page.data;
                    _a.label = 4;
                case 4:
                    if (!(page.meta.current_page < page.meta.last_page)) return [3 /*break*/, 6];
                    url.searchParams.set("page", (page.meta.current_page + 1).toString());
                    return [4 /*yield*/, doRequest(url)];
                case 5:
                    page = _a.sent();
                    data.push.apply(data, __spread(page.data));
                    return [3 /*break*/, 4];
                case 6:
                    // Delete pagination keys
                    url.searchParams.delete("page");
                    // Set the cache value
                    return [4 /*yield*/, store.set(decodeURI(url.href), {
                            created: Date.now(),
                            value: data,
                        })];
                case 7:
                    // Set the cache value
                    _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.default = request;
function requestSingle(endpoint, params, maxAge) {
    if (maxAge === void 0) { maxAge = Infinity; }
    return __awaiter(this, void 0, void 0, function () {
        var store, url, cached, age;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, keya.store("robotevents")];
                case 1:
                    store = _a.sent();
                    url = new URL(endpoint, "https://www.robotevents.com/api/v2/");
                    // Add the (custom seralized) search params to support the custom array behavior of the API
                    url.search = serialize(params);
                    return [4 /*yield*/, store.get(decodeURI(url.href))];
                case 2:
                    cached = _a.sent();
                    if (cached) {
                        age = Date.now() - cached.created;
                        if (age <= maxAge) {
                            return [2 /*return*/, cached.value];
                        }
                    }
                    // Otherwise do the request
                    return [2 /*return*/, doRequest(url)];
            }
        });
    });
}
exports.requestSingle = requestSingle;
//# sourceMappingURL=request.js.map