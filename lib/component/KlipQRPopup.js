"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class KlipQRPopup extends skynode_1.Popup {
    constructor(dataURL) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".klip-qr-popup", skynode_1.el("h2", "QR 코드로 Klip 접속"), skynode_1.el(".qr", skynode_1.el("img", { src: dataURL })), skynode_1.el("p", "QR 코드 리더기 또는 카카오톡 앱을 통해 QR 코드를 스캔해주세요."), skynode_1.el("p", "카카오톡 실행 ▶ 상단 검색창 클릭 ▶ 코드 스캔 후 로그인"), skynode_1.el("p", "* Klip > 코드스캔 (사이드메뉴)에서도 스캔이 가능합니다."), skynode_1.el(".button-container", skynode_1.el("button", "확인", {
            click: () => this.delete(),
        }))));
    }
}
exports.default = KlipQRPopup;
//# sourceMappingURL=KlipQRPopup.js.map