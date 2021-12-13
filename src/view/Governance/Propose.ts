import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Proposal from "../../component/Proposal";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Propose implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "거버넌스 제안";
        Layout.current.content.append(
            this.container = el(".governance-view",
                el("h1", "거버넌스 제안"),
                
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}