import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "NFT 채굴";
        Layout.current.content.append(
            this.container = el(".mining-view",
                el("h1", "MIX 채굴"),
                el(".paragraph", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다.\nNFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다.\n이를 통해 MIX의 유통량이 늘어납니다."),
                el(".ribbon", "* MIX 받기에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제로 받기 위한 것입니다."),
                el(".tabs",
                    el("a", "Mates", {
                        click: () => {
                        },
                    }),
                    el("a", "Cases by Kate", {
                        click: () => {
                        },
                    }),
                    el("a", "Animals Punks V2", {
                        click: () => {
                        },
                    }),
                    el("a", "Pixel Cat", {
                        click: () => {
                        },
                    }),
                ),
                el(".top-nav", el(".mix-container", el("h6", "쌓인 총 MIX"), el("h3", "5.19222")), el("button", "한꺼번에 받기"))
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}