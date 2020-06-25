"use strict";
/**
 * Searching for/filtering teams
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var _1 = require(".");
var request_1 = __importDefault(require("../../util/request"));
function search(options) {
    if (options === void 0) { options = {}; }
    return request_1.default("teams", options).then(function (response) {
        return response.map(function (data) { return new _1.Team(data); });
    });
}
exports.search = search;
//# sourceMappingURL=search.js.map