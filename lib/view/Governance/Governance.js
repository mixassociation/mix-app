"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Proposal_1 = __importDefault(require("../../component/Proposal"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Governance {
    constructor() {
        Layout_1.default.current.title = "거버넌스";
        Layout_1.default.current.content.append(this.container = skynode_1.el(".governance-view", skynode_1.el("h1", "MIX 거버넌스"), skynode_1.el(".top-nav", skynode_1.el("h2", "제안들"), skynode_1.el("button", "제안 생성", {
            click: () => ViewUtil_1.default.go("/governance/propose"),
        })), skynode_1.el(".proposal-list", new Proposal_1.default("DIP-1", "MIX 발행량 감소 제안", "종료"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Governance;
//# sourceMappingURL=Governance.js.map