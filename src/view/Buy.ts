import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Buy implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "MIX 구매";
        Layout.current.content.append(
            this.container = el(".buy-view",
                el("h1", "MIX 구매"),
                el(".klayswap",
                    el("img", { src: "/images/logo/klayswap.svg" }),
                    el("h4", "KLAY Swap"),
                ),
                el(".paragraph", "MIX는 국내 최대 DEFI 서비스인 KLAYSWAP에서 구매하실 수 있습니다."),
                el("a", "MIX 구매하기 >", {
                    href: "https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf"
                })
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}