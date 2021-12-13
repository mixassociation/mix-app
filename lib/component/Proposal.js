"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Proposal extends skynode_1.DomNode {
    constructor(serial, title, status) {
        super(".proposal-view");
        this.append(this.content = skynode_1.el(".proposal", skynode_1.el(".serial", serial), skynode_1.el("h5", title), skynode_1.el(".status", status)));
    }
}
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map