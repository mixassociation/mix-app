"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../../CommonUtil"));
const MatesPoolContract_1 = __importDefault(require("../../../contracts/mix/MatesPoolContract"));
const MixContract_1 = __importDefault(require("../../../contracts/mix/MixContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
class MateItem extends skynode_1.DomNode {
    constructor(tab, id, name) {
        super(".mate-item");
        this.tab = tab;
        this.id = id;
        this.claimable = ethers_1.BigNumber.from(0);
        this.append((0, skynode_1.el)(".content", (0, skynode_1.el)(".mate", { style: { backgroundImage: `url(https://storage.googleapis.com/dsc-mate/336/dscMate-${id}.png)` } }, (0, skynode_1.el)("span.id", `#${id}`), (0, skynode_1.el)("span.name", name)), (0, skynode_1.el)(".info", (0, skynode_1.el)("h5", "쌓인 MIX"), this.mixAmount = (0, skynode_1.el)(".amount", "Loading...")), (0, skynode_1.el)(".controller", (0, skynode_1.el)("a.claim-button", "받기", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const balance = await MixContract_1.default.balanceOf(owner);
                    const fee = this.claimable.div(9);
                    if (balance.lt(fee)) {
                    }
                    else {
                        if ((await MixContract_1.default.allowance(owner, MatesPoolContract_1.default.address)).lt(fee)) {
                            await MixContract_1.default.approve(MatesPoolContract_1.default.address, ethers_1.constants.MaxUint256);
                            setTimeout(async () => {
                                await MatesPoolContract_1.default.claim([this.id]);
                            }, 2000);
                        }
                        else {
                            await MatesPoolContract_1.default.claim([this.id]);
                        }
                    }
                }
            },
        }))));
        this.load();
        this.refreshInterval = setInterval(() => this.load(), 1000);
    }
    async load() {
        const claimable = await MatesPoolContract_1.default.claimableOf(this.id);
        if (this.deleted !== true) {
            this.mixAmount.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(claimable), 5));
            this.tab.changeMix(claimable.sub(this.claimable));
            this.claimable = claimable;
        }
    }
    delete() {
        clearInterval(this.refreshInterval);
        super.delete();
    }
}
exports.default = MateItem;
//# sourceMappingURL=MateItem.js.map