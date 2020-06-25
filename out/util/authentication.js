"use strict";
/**
 * Manages RobotEvents API authentication
 * In the future this may support EP accounts, but for now we're only supporting the read only API
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
exports.ok = exports.setCookie = exports.setBearer = exports.basic = exports.BEARER = exports.COOKIE = void 0;
var set_cookie_parser_1 = require("set-cookie-parser");
exports.COOKIE = "";
exports.BEARER = "";
var EXPIRES = Date.now();
var node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Automatically authenticates
 *
 * This function will perform a request to https://www.robotevents.com to get a re_session cookie with which to perform requests
 * Note: This function is automatically called when it is required
 */
function basic() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, cookie, re_session, expires;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://www.robotevents.com")];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        return [2 /*return*/, Promise.reject(new Error("Could not get CSRF token or Authentication Cookie"))];
                    }
                    cookie = set_cookie_parser_1.parse(response.headers.raw()["set-cookie"]);
                    re_session = cookie.find(function (c) { return c.name === "re_session"; });
                    expires = 1000 * ((_a = re_session === null || re_session === void 0 ? void 0 : re_session.maxAge) !== null && _a !== void 0 ? _a : 0) + Date.now();
                    return [2 /*return*/, setCookie(cookie.map(function (c) { return c.name + "=" + c.value; }).join("; "), expires)];
            }
        });
    });
}
exports.basic = basic;
/**
 * Sets the Bearer Token to provide to robotevents
 * @param bearer
 */
function setBearer(bearer) {
    return (exports.BEARER = bearer);
}
exports.setBearer = setBearer;
/**
 * Sets the RobotEvents Cookie (required for access)
 * @param cookie
 * @param expires
 */
function setCookie(cookie, expires) {
    EXPIRES = expires;
    return (exports.COOKIE = cookie);
}
exports.setCookie = setCookie;
/**
 * Checks if the user agent has been authenticated correctly
 */
function ok() {
    var ok = !exports.COOKIE && EXPIRES > Date.now();
    if (!ok) {
        exports.COOKIE = "";
    }
    return ok;
}
exports.ok = ok;
//# sourceMappingURL=authentication.js.map