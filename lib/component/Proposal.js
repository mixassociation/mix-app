"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class Proposal extends skynode_1.DomNode {
    constructor(id, title, status) {
        super("a.proposal");
        this.append((0, skynode_1.el)("h5", title), (0, skynode_1.el)(".status", status));
        this.onDom("click", () => {
            ViewUtil_1.default.go(`/governance/${id}`);
        });
    }
}
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map