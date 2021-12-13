import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Proposal from "../../component/Proposal";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Governance implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "거버넌스";
        Layout.current.content.append(
            this.container = el(".governance-view",
                el("h1", "MIX 거버넌스"),
                el(".top-nav", el("h2", "제안들"), el("button", "제안 생성", {
                    click: () => ViewUtil.go("/governance/propose"),
                })),
                el(".proposal-list", new Proposal("DIP-1", "MIX 발행량 감소 제안", "종료"))
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}