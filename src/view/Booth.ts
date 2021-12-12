import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Booth implements View {

    private container: DomNode;

    constructor() {
        Layout.current.title = "부스";
        Layout.current.content.append(
            this.container = el(".booth-view",
                el("h1", "부스"),
                el("h4", "무손실 단일 예치 시스템"),
                el(".paragraph", "MIX가 소각될 때 마다 소각량의 0.3%가 부스에 대한 지분에 따라 분배됩니다.\nMIX를 부스에 스테이킹하면 부스의 지분에 해당하는 MIXSET을 받게 됩니다.\nMIXSET은 지속적으로 복리 이자를 생성하며,\n스테이킹 해제 시 원금 MIX와 수수료 이자를 함께 돌려받게 됩니다."),
                el("img.mixset", { src: "/images/logo/mixset.svg" }),
                el("div.none-bold-h6", "1 MIXSET = 1.01812 MIX"),
                el("div.none-bold-h6", "지난 24시간 동안의 APR: 16.21%"),
                el("div.none-bold-h6", "예치된 총 MIX: 159,552.919 MIX"),
                el("div.none-bold-h6", "지난 24시간 동안 소각된 MIX: 23,626.608 MIX"),
                el("div.none-bold-h6", "지난 24시간 동안 분배된 MIX: 70.88 MIX"),
                el(".text-container", "* APR(Annual Percentage Rate)은 지난 24시간의 기록을 365일로 늘려서 계산된 것입니다. \n따라서 매일 변경될 수 있습니다."),
                el("h2", "MIX 스테이킹"),
                el(".form",
                    el("input", { placeholder: "예치할 액수를 넣어주세요." }),
                    el(".container", el(".caption", el("img", { src: "/images/logo/mix.svg", height: "20px" }), el("label", "MIX: 300.18")), el("button.max-btn", "최대 수량")), el("button", "예치하기")),
                el(".text-container", "* 예치 시에는 2번의 트랜잭션이 발생합니다. \n한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제 예치를 위한 것입니다."),
                el("h2", "MIX 스테이킹 해제"),
                el(".form",
                    el("input", { placeholder: "예치할 액수를 넣어주세요." }),
                    el(".container", el(".caption", el("img", { src: "/images/logo/mixset.svg", height: "20px" }), el("label", "MIXSET: 300.18")), el("button.max-btn", "최대 수량")), el("button", "예치하기")),
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}