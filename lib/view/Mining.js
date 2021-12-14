"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        Layout_1.default.current.title = "NFT 채굴";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mining-view", (0, skynode_1.el)("h1", "MIX 채굴"), (0, skynode_1.el)(".paragraph", "아래 NFT를 보유하고 있으면 MIX를 분배받게 됩니다.\nNFT 홀더들은 쌓여진 MIX를 인출하기 위해 쌓여진 MIX 수량의 10%를 선납해야합니다.\n이를 통해 MIX의 유통량이 늘어납니다."), (0, skynode_1.el)(".ribbon", "* MIX 받기에는 2번의 트랜잭션이 발생합니다. 한번은 토큰 사용 허락을 위한 것이며, 다른 하나는 실제로 받기 위한 것입니다."), (0, skynode_1.el)(".tabs", (0, skynode_1.el)("a", "Mates", {
            click: () => {
            },
        }), (0, skynode_1.el)("a", "Cases by Kate", {
            click: () => {
            },
        }), (0, skynode_1.el)("a", "Animals Punks V2", {
            click: () => {
            },
        }), (0, skynode_1.el)("a", "Pixel Cat", {
            click: () => {
            },
        })), (0, skynode_1.el)(".top-nav", (0, skynode_1.el)(".mix-container", (0, skynode_1.el)("h6", "쌓인 총 MIX"), (0, skynode_1.el)("h3", "5.19222")), (0, skynode_1.el)("button", "한꺼번에 받기"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Mining;
//# sourceMappingURL=Mining.js.map