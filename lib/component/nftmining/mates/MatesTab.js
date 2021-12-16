"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../../CommonUtil"));
const MatesPoolContract_1 = __importDefault(require("../../../contracts/mix/MatesPoolContract"));
const MixContract_1 = __importDefault(require("../../../contracts/mix/MixContract"));
const MateContract_1 = __importDefault(require("../../../contracts/nft/MateContract"));
const Wallet_1 = __importDefault(require("../../../klaytn/Wallet"));
const Loading_1 = __importDefault(require("../../loading/Loading"));
const MateItem_1 = __importDefault(require("./MateItem"));
class MatesTab extends skynode_1.DomNode {
    constructor() {
        super(".mates-tab");
        this.mates = [];
        this.totalMix = bignumber_1.BigNumber.from(0);
        this.append((0, skynode_1.el)("header", (0, skynode_1.el)(".total-mix", (0, skynode_1.el)("h4", "쌓인 총 MIX"), this.totalMixDisplay = (0, skynode_1.el)("span", "Loading...")), (0, skynode_1.el)("button.take-all-button", "한꺼번에 받기", {
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
                        if ((await MixContract_1.default.allowance(owner, MatesPoolContract_1.default.address)).lt(fee)) {
                            await MixContract_1.default.approve(MatesPoolContract_1.default.address, ethers_1.constants.MaxUint256);
                            setTimeout(async () => {
                                await MatesPoolContract_1.default.claim(this.mates);
                            }, 2000);
                        }
                        else {
                            await MatesPoolContract_1.default.claim(this.mates);
                        }
                    }
                }
            },
        })), this.list = (0, skynode_1.el)(".mate-list", new Loading_1.default()));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            const result = await superagent_1.default.get("https://api.dogesound.club/mate/names");
            const mateNames = result.body;
            const balance = (await MateContract_1.default.balanceOf(walletAddress)).toNumber();
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const mateId = await MateContract_1.default.tokenOfOwnerByIndex(walletAddress, index);
                    this.mates.push(mateId.toNumber());
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            this.list.empty();
            for (const mateId of this.mates) {
                new MateItem_1.default(this, mateId, mateNames[mateId]).appendTo(this.list);
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
exports.default = MatesTab;
//# sourceMappingURL=MatesTab.js.map