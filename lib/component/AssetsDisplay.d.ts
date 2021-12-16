import { DomNode } from "@hanul/skynode";
interface TotalAssets {
    mix: string;
    mixset: string;
    devfunds: string;
    klaylp: string;
    ksplp: string;
    turntableVolume: number;
    mates: number;
    cases: number;
    apunks: number;
    pixelcats: number;
}
export default class AssetsDisplay extends DomNode {
    constructor(assets: TotalAssets | undefined);
}
export {};
//# sourceMappingURL=AssetsDisplay.d.ts.map