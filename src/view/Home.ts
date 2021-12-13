import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Home implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "NFT 프로젝트 허브를 위한 토큰";
        Layout.current.content.append(
            (this.container = el(".home-view",
                el(".content",
                    "거버넌스를 제외한 다른 페이지들은 작업중입니다. 거버넌스 도입이 시급하여 거버넌스 페이지만을 오픈한 상태입니다.",
                ),
            )),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}