"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class Propose {
    constructor() {
        Layout_1.default.current.title = "거버넌스 제안";
        Layout_1.default.current.content.append(this.container = skynode_1.el(".governance-view", skynode_1.el("h1", "거버넌스 제안")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Propose;
//# sourceMappingURL=Propose.js.map