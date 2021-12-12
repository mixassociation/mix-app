import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "../Layout";
import Proposal from '../../component/Proposal';

export default class GovernanceDetail implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "MIX 발행량 감소 제안";
        Layout.current.content.append(
            this.container = el(".governance-detail-view",
                el("h1", "MIX 발행량 감소 제안"),
                el(".top-nav", el("h5", "투표 종료까지 ~블록 남음"), el(".status", "종료")),
                el(".content",
                    el("h6", "요약"),
                    el(".paragraph", "MIX 1일 발행량 50%로 감소.\n(블럭당 1 MIX -> 블럭당 0.5 MIX)"),
                    el("h6", "본문"),
                    el(".paragraph", "현재 MIX의 사용성에 비해, 발행량이 꾸준한 상황. 앞으로 MIX의 성장은 여전히 클 것으로 기대하지만, 거래소 등의 MIX소비가 활발해지기 전까지는 적절한 MIX양의 조절이 필요하다고 판단됨."),
                    el("h6", "제안자"),
                    el(".paragraph", "0x691696aBD1C97fBD3c823B368Fa69cAaE1438b35"),
                    el(".vote-container", el("input", { type: "checkbox" }), el("label", "파트너십을 체결한다.")),
                ),
                el("button", "투표")
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}