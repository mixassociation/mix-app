import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Buy implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "NFT 프로젝트 허브를 위한 토큰";
        Layout.current.content.append(
            this.container = el(".home-view", el("div", "hello mix!"))
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}