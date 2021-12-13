"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Buy {
    constructor() {
        Layout_1.default.current.title = "MIX 구매";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buy-view", (0, skynode_1.el)("h1", "MIX 구매"), (0, skynode_1.el)(".klayswap", (0, skynode_1.el)("img", { src: "/images/logo/klayswap.svg" }), (0, skynode_1.el)("h4", "KLAY Swap")), (0, skynode_1.el)(".paragraph", "MIX는 국내 최대 DEFI 서비스인 KLAYSWAP에서 구매하실 수 있습니다."), (0, skynode_1.el)("a", "MIX 구매하기 >", {
            href: "https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf"
        })));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Buy;
//# sourceMappingURL=Buy.js.map