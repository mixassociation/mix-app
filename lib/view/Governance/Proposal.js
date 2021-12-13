"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const marked_1 = __importDefault(require("marked"));
const skyrouter_1 = require("skyrouter");
const xss_1 = __importDefault(require("xss"));
const Alert_1 = __importDefault(require("../../component/dialogue/Alert"));
const Confirm_1 = __importDefault(require("../../component/dialogue/Confirm"));
const Prompt_1 = __importDefault(require("../../component/dialogue/Prompt"));
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../klaytn/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class Proposal {
    constructor(params) {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".governance-proposal-view"));
        this.load(params.proposalId);
    }
    async load(proposalId) {
        const result = await fetch(`https://${Config_1.default.apiHost}/governance/proposal/${proposalId}`);
        const proposal = await result.json();
        Layout_1.default.current.title = proposal.title;
        let contentDisplay;
        let noteDisplay;
        let optionList;
        this.container.append((0, skynode_1.el)("h1", proposal.title), (0, skynode_1.el)(".content", (0, skynode_1.el)("h6", "요약"), (0, skynode_1.el)(".paragraph", proposal.summary), (0, skynode_1.el)("h6", "본문"), contentDisplay = (0, skynode_1.el)(".paragraph.markdown-body"), (0, skynode_1.el)("h6", "비고"), noteDisplay = (0, skynode_1.el)(".paragraph.markdown-body"), (0, skynode_1.el)("h6", "제안자"), (0, skynode_1.el)(".paragraph", proposal.proposer)), (0, skynode_1.el)(".options-wrapper", (0, skynode_1.el)(".options", (0, skynode_1.el)(".list", (0, skynode_1.el)("header", (0, skynode_1.el)(".title", "후보"), (0, skynode_1.el)(".voters", "투표자"), (0, skynode_1.el)(".percent", "가중치"), (0, skynode_1.el)(".controller", "투표하기")), optionList = (0, skynode_1.el)("ul")), (0, skynode_1.el)("p", "후보들 중에 마음에 드는 후보가 없는 경우 다른 후보를 등록할 수 있습니다."), proposal.passed !== true ? undefined : (0, skynode_1.el)("button", "후보 추가", {
            click: () => {
                new Prompt_1.default("후보 추가", "선택지로 추가할 후보를 입력해주시기 바랍니다. 후보를 추가하면 추가한 당사자는 해당 후보로 자동으로 투표합니다.", "추가하기", async (optionTitle) => {
                    const walletAddress = await Wallet_1.default.loadAddress();
                    if (walletAddress !== undefined) {
                        const signedMessage = await Wallet_1.default.signMessage("Add Governance Proposal Option");
                        const result = await fetch(`https://${Config_1.default.apiHost}/governance/addoption`, {
                            method: "POST",
                            body: JSON.stringify({
                                proposalId,
                                option: optionTitle,
                                voter: walletAddress,
                                signedMessage,
                            }),
                        });
                        if (result.ok === true) {
                            skyrouter_1.SkyRouter.refresh();
                        }
                        else {
                            new Alert_1.default("실패", "투표에 실패했습니다.");
                        }
                    }
                });
            },
        }))));
        for (const [optionIndex, option] of proposal.options.entries()) {
            optionList.append((0, skynode_1.el)("li", (0, skynode_1.el)(".title", option.title), (0, skynode_1.el)(".voters", String(option.voters.length)), (0, skynode_1.el)(".percent", "준비중"), (0, skynode_1.el)(".controller", proposal.passed !== true ? undefined : (0, skynode_1.el)("button", "투표하기", {
                click: () => {
                    new Confirm_1.default("투표하기", `\"${option.title}\" 후보에 투표하시겠습니까? 투표후 다른 후보에 재투표가 가능하며, 투표 취소는 불가능합니다.`, "투표하기", async () => {
                        const walletAddress = await Wallet_1.default.loadAddress();
                        if (walletAddress !== undefined) {
                            const signedMessage = await Wallet_1.default.signMessage("Vote Governance Proposal");
                            const result = await fetch(`https://${Config_1.default.apiHost}/governance/vote`, {
                                method: "POST",
                                body: JSON.stringify({
                                    proposalId,
                                    optionIndex,
                                    voter: walletAddress,
                                    signedMessage,
                                }),
                            });
                            if (result.ok === true) {
                                skyrouter_1.SkyRouter.refresh();
                            }
                            else {
                                new Alert_1.default("실패", "투표에 실패했습니다.");
                            }
                        }
                    });
                },
            }))));
        }
        contentDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(proposal.content));
        noteDisplay.domElement.innerHTML = (0, xss_1.default)((0, marked_1.default)(proposal.note));
        if (proposal.passed !== true) {
            this.container.append((0, skynode_1.el)("p", "검토중인 제안입니다. 검토가 완료되면 투표를 진행하실 수 있습니다."));
            const walletAddress = await Wallet_1.default.loadAddress();
            if (walletAddress === Config_1.default.admin) {
                this.container.append((0, skynode_1.el)(".controller", (0, skynode_1.el)("button", "통과", {
                    click: async () => {
                        const signedMessage = await Wallet_1.default.signMessage("Pass Governance Proposal");
                        await fetch(`https://${Config_1.default.apiHost}/governance/passproposal`, {
                            method: "POST",
                            body: JSON.stringify({
                                proposalId,
                                signedMessage,
                            }),
                        });
                        skyrouter_1.SkyRouter.refresh();
                    },
                })));
            }
        }
    }
    changeParams(params, uri) {
        this.load(params.proposalId);
    }
    close() {
        this.container.delete();
    }
}
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map