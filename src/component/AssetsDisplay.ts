import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { TotalAssets } from "../AssetsCalculator";

export default class AssetsDisplay extends DomNode {

    constructor(assets: TotalAssets | undefined) {
        super(".assets-display");
        if (assets === undefined) {
            this.appendText("자산을 계산중입니다.");
        } else {
            this.append(

                el(".asset.mix", el("h6", "MIX"), el("span", utils.formatEther(assets.mix))),
                el(".asset.mixset", el("h6", "Mixset"), el("span", utils.formatEther(assets.mixset))),
                el(".asset.turntable-volume", el("h6", "턴테이블 총 볼륨"), el("span", String(assets.turntableVolume))),

                el(".asset.mates", el("h6", "DSC Mates 개수"), el("span", String(assets.mates))),
                el(".asset.cases", el("h6", "Cases by Kate 개수"), el("span", String(assets.cases))),
                el(".asset.apunks", el("h6", "Animals Punks V2 개수"), el("span", String(assets.apunks))),
                el(".asset.pixelcats", el("h6", "Pixel Cats 개수"), el("span", String(assets.pixelcats))),

                el(".asset.klaylp", el("h6", "Klay-MIX LP 토큰 총 수량"), el("span", utils.formatEther(assets.klaylp))),
                el(".asset.ksplp", el("h6", "KSP-MIX LP 토큰 총 수량"), el("span", utils.formatEther(assets.ksplp))),

                el(".asset.devfunds", el("h6", "Dev Team"), el("span", utils.formatEther(assets.devfunds))),
            );
        }
    }
}
