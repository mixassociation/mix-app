"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("../Layout"));
class GovernanceDetail {
    constructor() {
        Layout_1.default.current.title = "MIX 발행량 감소 제안";
        Layout_1.default.current.content.append(this.container = skynode_1.el(".governance-detail-view", skynode_1.el("h1", "MIX 발행량 감소 제안"), skynode_1.el(".top-nav", skynode_1.el("h5", "투표 종료까지 ~블록 남음"), skynode_1.el(".status", "종료")), skynode_1.el(".content", skynode_1.el("h6", "요약"), skynode_1.el(".paragraph", "MIX 1일 발행량 50%로 감소.\n(블럭당 1 MIX -> 블럭당 0.5 MIX)"), skynode_1.el("h6", "본문"), skynode_1.el(".paragraph", "현재 MIX의 사용성에 비해, 발행량이 꾸준한 상황. 앞으로 MIX의 성장은 여전히 클 것으로 기대하지만, 거래소 등의 MIX소비가 활발해지기 전까지는 적절한 MIX양의 조절이 필요하다고 판단됨."), skynode_1.el("h6", "제안자"), skynode_1.el(".paragraph", "0x691696aBD1C97fBD3c823B368Fa69cAaE1438b35")), skynode_1.el(".vote-container", skynode_1.el("input", { type: "checkbox" }), skynode_1.el("label", "파트너십을 체결한다.")), skynode_1.el("button", "투표")));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = GovernanceDetail;
//# sourceMappingURL=GovernanceDetail.js.map