"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const Confirm_1 = __importDefault(require("../../component/dialogue/Confirm"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
const ViewUtil_1 = __importDefault(require("../ViewUtil"));
class Propose {
    constructor() {
        this.connectHandler = () => {
            this.loadAddress();
        };
        Layout_1.default.current.title = "거버넌스 제안";
        let titleInput;
        let summaryInput;
        let contentInput;
        let noteInput;
        let termCheckbox;
        let optionList;
        let optionTitles = [];
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-propose-view", (0, skynode_1.el)("h1", "거버넌스 제안"), (0, skynode_1.el)(".form", (0, skynode_1.el)("label", (0, skynode_1.el)("span", "제목"), titleInput = (0, skynode_1.el)("input", { placeholder: "제안 제목을 입력하세요." })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "요약"), summaryInput = (0, skynode_1.el)("textarea", { placeholder: "제안의 핵심적인 부분만 적어주세요." })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "본문"), (0, skynode_1.el)("p", "본문은 마크다운 문법을 사용하실 수 있습니다."), (0, skynode_1.el)("a.markdown-button", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }), contentInput = (0, skynode_1.el)("textarea.content", { placeholder: "제안을 설명해주세요." })), (0, skynode_1.el)("label", (0, skynode_1.el)("span", "비고"), noteInput = (0, skynode_1.el)("textarea", { placeholder: "비고를 적어주세요." })), (0, skynode_1.el)(".options", (0, skynode_1.el)("h5", "후보 등록"), optionList = (0, skynode_1.el)("ul"), (0, skynode_1.el)("button", "후보 추가", {
            click: () => {
                new Prompt_1.default("후보 추가", "선택지로 추가할 후보를 입력해주시기 바랍니다.", "추가하기", (optionTitle) => {
                    optionTitles.push(optionTitle);
                    const candidate = (0, skynode_1.el)("li", (0, skynode_1.el)("span", optionTitle), (0, skynode_1.el)("a.delete-button", "삭제", {
                        click: () => {
                            skyutil_1.default.pull(optionTitles, optionTitle);
                            candidate.delete();
                        },
                    })).appendTo(optionList);
                });
            },
        })), (0, skynode_1.el)(".proposer", (0, skynode_1.el)("h5", "제안자"), this.proposer = (0, skynode_1.el)("span")), (0, skynode_1.el)(".term", (0, skynode_1.el)("label", termCheckbox = (0, skynode_1.el)("input", { type: "checkbox" }), (0, skynode_1.el)("p", "제출된 제안을 취소 또는 수정할 수 없음에 동의합니다.\n이 인터페이스는 거버넌스를 위해 본인이 선택한 편리한 도구일뿐이며,\n서명에 따른 모든 결과에 대한 책임은 서명한 지갑 소유주에게 있음에 동의합니다."))), (0, skynode_1.el)(".controller", (0, skynode_1.el)("button", "제안하기", {
            click: () => {
                if (termCheckbox.domElement.checked === true) {
                    new Confirm_1.default("제안하기", "제안을 등록하시겠습니까? 제안 후에는 내용을 수정할 수 없사오니 다시 한 번 확인해주시기 바랍니다.", "제안 등록", async () => {
                        const walletAddress = await Wallet_1.default.loadAddress();
                        if (walletAddress !== undefined) {
                            const result = await Wallet_1.default.signMessage("Governance Proposal");
                            await fetch(`https://${Config_1.default.apiHost}/governance/propose`, {
                                method: "POST",
                                body: JSON.stringify({
                                    title: titleInput.domElement.value,
                                    summary: summaryInput.domElement.value,
                                    content: contentInput.domElement.value,
                                    note: noteInput.domElement.value,
                                    proposer: walletAddress,
                                    options: optionTitles,
                                    signedMessage: result.signedMessage,
                                    klipSignKey: result.klipSignKey,
                                }),
                            });
                            ViewUtil_1.default.go("/governance");
                        }
                    });
                }
            },
        })))));
        this.loadAddress();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async loadAddress() {
        const walletAddress = await Wallet_1.default.loadAddress();
        if (walletAddress !== undefined) {
            this.proposer.empty().appendText(walletAddress);
        }
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Propose;
//# sourceMappingURL=Propose.js.map