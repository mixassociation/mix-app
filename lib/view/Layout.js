"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/menu/UserInfo"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = skynode_1.el(".layout", skynode_1.el("header", skynode_1.el("a", { click: () => ViewUtil_1.default.go("/") }, skynode_1.el(".logo", skynode_1.el("img", { src: "/images/logo/logo.svg", height: "20" }))), new PCMenu_1.default(), skynode_1.el(".right", new UserInfo_1.default(), skynode_1.el("a.menu-button", skynode_1.el("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        }))), skynode_1.el("main", (this.content = skynode_1.el(".content"))), skynode_1.el("footer", "Copyright © 2021 Mix Association. All rights reserved."))));
    }
    set title(title) {
        document.title = `${title} | Mix`;
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map