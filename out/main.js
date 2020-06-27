"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.programs = __importStar(require("./endpoints/programs"));
exports.seasons = __importStar(require("./endpoints/seasons"));
exports.events = __importStar(require("./endpoints/events"));
exports.teams = __importStar(require("./endpoints/teams"));
exports.ratelimit = __importStar(require("./util/ratelimit"));
exports.authentication = __importStar(require("./util/authentication"));
exports.v1 = __importStar(require("./v1"));
//# sourceMappingURL=main.js.map