"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../../CommonUtil"));
const MixContract_1 = __importDefault(require("../../../contracts/mix/MixContract"));
const PixelCatPoolContract_1 = __importDefault(require("../../../contracts/mix/PixelCatPoolContract"));
const PixelCatContract_1 = __importDefault(require("../../../contracts/nft/PixelCatContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Loading_1 = __importDefault(require("../../loading/Loading"));
const PixelCatItem_1 = __importDefault(require("./PixelCatItem"));
class PixelCatTab extends skynode_1.DomNode {
    constructor() {
        super(".pixel-cat-tab");
        this.nfts = [];
        this.totalMix = bignumber_1.BigNumber.from(0);
        this.append((0, skynode_1.el)("header", (0, skynode_1.el)(".total-mix", (0, skynode_1.el)("h4", "쌓인 총 MIX"), this.totalMixDisplay = (0, skynode_1.el)("span", "Loading...")), (0, skynode_1.el)("a.take-all-button", "한꺼번에 받기", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const balance = await MixContract_1.default.balanceOf(owner);
                    const fee = this.totalMix.div(9);
                    if (balance.lt(fee)) {
                    }
                    else {
                        if ((await MixContract_1.default.allowance(owner, PixelCatPoolContract_1.default.address)).lt(fee)) {
                            await MixContract_1.default.approve(PixelCatPoolContract_1.default.address, ethers_1.constants.MaxUint256);
                            setTimeout(async () => {
                                await PixelCatPoolContract_1.default.claim(this.nfts);
                            }, 2000);
                        }
                        else {
                            await PixelCatPoolContract_1.default.claim(this.nfts);
                        }
                    }
                }
            },
        })), this.list = (0, skynode_1.el)(".pixel-cat-list", new Loading_1.default()));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const balance = (await PixelCatContract_1.default.balanceOf(walletAddress)).toNumber();
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const nftId = await PixelCatContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    this.nfts.push(nftId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.list.empty();
            for (const nftId of this.nfts) {
                new PixelCatItem_1.default(this, nftId).appendTo(this.list);
            }
        }
        else {
            this.list.empty();
        }
    }
    changeMix(mix) {
        this.totalMix = this.totalMix.add(mix);
        this.totalMixDisplay.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.totalMix), 5));
    }
}
exports.default = PixelCatTab;
//# sourceMappingURL=PixelCatTab.js.map