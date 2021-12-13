"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Klip_1 = __importDefault(require("../klaytn/Klip"));
class ConnectWalletPopup extends skynode_1.Popup {
    constructor(callback) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".connect-wallet-popup", skynode_1.el("h2", "클레이튼 지갑 연결"), skynode_1.el("p", "Klubs는 클레이튼 블록체인과의 연결이 필요합니다. 카이카스 혹은 카카오톡 클립에서 연결해주시기 바랍니다."), skynode_1.el(".button-container", skynode_1.el("button.connect-kaikas-button", skynode_1.el("img", { src: "/images/icon/kaikas.svg" }), "카이카스 설치", { href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi", target: "_blank" }), skynode_1.el("button.connect-klip-button", skynode_1.el("img", { src: "/images/icon/klip.svg" }), "카카오톡 클립으로 연결", {
            click: async () => {
                await Klip_1.default.connect();
                callback();
                this.delete();
            },
        }), skynode_1.el("button.button.cancel-button", "연결하지 않고 둘러보기", {
            click: () => this.delete(),
        }))));
    }
}
exports.default = ConnectWalletPopup;
//# sourceMappingURL=ConnectWalletPopup.js.map