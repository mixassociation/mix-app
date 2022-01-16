import { BigNumberish } from "@ethersproject/bignumber";
import KIP7Contract from "../standard/KIP7Contract";
declare class MixContract extends KIP7Contract {
    constructor();
    burn(amount: BigNumberish): Promise<void>;
}
declare const _default: MixContract;
export default _default;
//# sourceMappingURL=MixContract.d.ts.map