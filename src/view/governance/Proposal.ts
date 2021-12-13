import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { SkyRouter, View, ViewParams } from "skyrouter";
import xss from "xss";
import Alert from "../../component/dialogue/Alert";
import Confirm from "../../component/dialogue/Confirm";
import Prompt from "../../component/dialogue/Prompt";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";

export default class Proposal implements View {

    private container: DomNode;

    constructor(params: ViewParams) {
        Layout.current.content.append(
            this.container = el(".governance-proposal-view"),
        );
        this.load(params.proposalId);
    }

    private async load(proposalId: string) {

        const result = await fetch(`https://${Config.apiHost}/governance/proposal/${proposalId}`);
        const proposal = await result.json();
        Layout.current.title = proposal.title;

        let contentDisplay;
        let optionList;

        this.container.append(
            el("h1", proposal.title),
            el(".content",
                el("h6", "요약"),
                el(".paragraph", proposal.summary),
                el("h6", "본문"),
                contentDisplay = el(".paragraph"),
                el("h6", "비고"),
                el(".paragraph", proposal.note),
                el("h6", "제안자"),
                el(".paragraph", proposal.proposer),
            ),
            el(".options-wrapper",
                el(".options",
                    el(".list",
                        el("header",
                            el(".title", "후보"),
                            el(".voters", "투표자"),
                            el(".percent", "가중치"),
                            el(".controller", "투표하기"),
                        ),
                        optionList = el("ul"),
                    ),
                    el("p", "후보들 중에 마음에 드는 후보가 없는 경우 다른 후보를 등록할 수 있습니다."),
                    proposal.passed !== true ? undefined : el("button", "후보 추가", {
                        click: () => {
                            new Prompt("후보 추가", "선택지로 추가할 후보를 입력해주시기 바랍니다. 후보를 추가하면 추가한 당사자는 해당 후보로 자동으로 투표합니다.", "추가하기", async (optionTitle) => {
                                const walletAddress = await Wallet.loadAddress();
                                if (walletAddress !== undefined) {
                                    const signedMessage = await Wallet.signMessage("Add Governance Proposal Option");
                                    const result = await fetch(`https://${Config.apiHost}/governance/addoption`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            proposalId,
                                            option: optionTitle,
                                            voter: walletAddress,
                                            signedMessage,
                                        }),
                                    });
                                    if (result.ok === true) {
                                        SkyRouter.refresh();
                                    } else {
                                        new Alert("실패", "투표에 실패했습니다.");
                                    }
                                }
                            });
                        },
                    }),
                ),
            ),
        );

        for (const [optionIndex, option] of proposal.options.entries()) {
            optionList.append(el("li",
                el(".title", option.title),
                el(".voters", String(option.voters.length)),
                el(".percent", "준비중"),
                el(".controller",
                    proposal.passed !== true ? undefined : el("button", "투표하기", {
                        click: () => {
                            new Confirm("투표하기", `\"${option.title}\" 후보에 투표하시겠습니까? 투표후 다른 후보에 재투표가 가능하며, 투표 취소는 불가능합니다.`, "투표하기", async () => {
                                const walletAddress = await Wallet.loadAddress();
                                if (walletAddress !== undefined) {
                                    const signedMessage = await Wallet.signMessage("Vote Governance Proposal");
                                    const result = await fetch(`https://${Config.apiHost}/governance/vote`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            proposalId,
                                            optionIndex,
                                            voter: walletAddress,
                                            signedMessage,
                                        }),
                                    });
                                    if (result.ok === true) {
                                        SkyRouter.refresh();
                                    } else {
                                        new Alert("실패", "투표에 실패했습니다.");
                                    }
                                }
                            });
                        },
                    }),
                ),
            ));
        }

        contentDisplay.domElement.innerHTML = xss(marked(proposal.content));

        if (proposal.passed !== true) {
            this.container.append(el("p", "검토중인 제안입니다. 검토가 완료되면 투표를 진행하실 수 있습니다."));

            const walletAddress = await Wallet.loadAddress();
            if (walletAddress === Config.admin) {
                this.container.append(el(".controller",
                    el("button", "통과", {
                        click: async () => {
                            const signedMessage = await Wallet.signMessage("Pass Governance Proposal");
                            await fetch(`https://${Config.apiHost}/governance/passproposal`, {
                                method: "POST",
                                body: JSON.stringify({
                                    proposalId,
                                    signedMessage,
                                }),
                            });
                            SkyRouter.refresh();
                        },
                    })
                ));
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.proposalId);
    }

    public close(): void {
        this.container.delete();
    }
}