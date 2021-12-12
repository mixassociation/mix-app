import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";
import Proposal from '../component/Proposal';

export default class Governance implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "MIX 구매";
        Layout.current.content.append(
            this.container = el(".governance-view",
                el("h1", "MIX 거버넌스"),
                el(".paragraph", "MIX는 MIX 거버넌스의 의결권을 나타냅니다.\n제안을 하거나, 등록된 제안에 찬반을 가진 MIX 개수만큼 투표할 수 있습니다.\n제안을 하려면 MIX ~개가 필요합니다."),
                el(".top-nav", el("h2", "제안들"), el("button", "제안 생성")),
                el(".proposal-list", new Proposal("DIP-1", "MIX 발행량 감소 제안", "종료"))
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}