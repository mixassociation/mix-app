import { DomNode, el } from "@hanul/skynode";
import marked from "marked";
import { SkyRouter, View, ViewParams } from "skyrouter";
import xss from "xss";
import AssetsCalculator from "../../AssetsCalculator";
import CommonUtil from "../../CommonUtil";
import AssetsDisplay from "../../component/AssetsDisplay";
import Alert from "../../component/dialogue/Alert";
import Confirm from "../../component/dialogue/Confirm";
import Prompt from "../../component/dialogue/Prompt";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import TimeFormatter from "../../TimeFormatter";
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
        let noteDisplay;
        let optionList;

        this.container.append(
            el("h1", proposal.title),
            el(".content",
                el("h6", "기간"),
                el(".paragraph", `투표 종료: ${TimeFormatter.fromNow(new Date(proposal.passTime + 604800000))}`),
                el("h6", "요약"),
                el(".paragraph", proposal.summary),
                el("h6", "본문"),
                contentDisplay = el(".paragraph.markdown-body"),
                el("h6", "비고"),
                noteDisplay = el(".paragraph.markdown-body"),
                el("h6", "제안자"),
                el(".paragraph", proposal.proposer),
            ),
            el(".assets",
                el("h2", "총 투표자산"),
                new AssetsDisplay(proposal.voterAssets),
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
                    el(".caption-container", el("img", { src: "/images/icon/info.svg" }), el("p", "후보들 중에 마음에 드는 후보가 없는 경우 다른 후보를 등록할 수 있습니다.")),
                    proposal.passed !== true ? undefined : el("button", "후보 추가", {
                        click: () => {
                            new Prompt("후보 추가", "선택지로 추가할 후보를 입력해주시기 바랍니다. 후보를 추가하면 추가한 당사자는 해당 후보로 자동으로 투표합니다.", "추가하기", async (optionTitle) => {
                                const walletAddress = await Wallet.loadAddress();
                                if (walletAddress !== undefined) {
                                    const signResult = await Wallet.signMessage("Add Governance Proposal Option");
                                    const result = await fetch(`https://${Config.apiHost}/governance/addoption`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            proposalId,
                                            option: optionTitle,
                                            voter: walletAddress,
                                            signedMessage: signResult.signedMessage,
                                            klipSignKey: signResult.klipSignKey,
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
                el(".percent-container", el("img.mobile-percent", { src: "/images/icon/balance.svg" }),
                    el(".percent", `${CommonUtil.numberWithCommas(String(AssetsCalculator.calculatePercent(proposal.voterAssets, option.voterAssets)))}%`)),
                el(".controller",
                    proposal.passed !== true ? undefined : el("button", "투표하기", {
                        click: () => {
                            new Confirm("투표하기", `\"${option.title}\" 후보에 투표하시겠습니까? 투표후 다른 후보에 재투표가 가능하며, 투표 취소는 불가능합니다.`, "투표하기", async () => {
                                const walletAddress = await Wallet.loadAddress();
                                if (walletAddress !== undefined) {
                                    const signResult = await Wallet.signMessage("Vote Governance Proposal");
                                    const result = await fetch(`https://${Config.apiHost}/governance/vote`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            proposalId,
                                            optionIndex,
                                            voter: walletAddress,
                                            signedMessage: signResult.signedMessage,
                                            klipSignKey: signResult.klipSignKey,
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
        noteDisplay.domElement.innerHTML = xss(marked(proposal.note));

        if (proposal.rejected === true) {
            this.container.append(el("p.reject-reason", proposal.rejectReason));
        }

        else if (proposal.passed !== true) {
            this.container.append(el("p.review", "검토중인 제안입니다. 검토가 완료되면 투표를 진행하실 수 있습니다."));

            const walletAddress = await Wallet.loadAddress();
            if (walletAddress === Config.admin) {
                this.container.append(el(".controller",
                    el("button", "통과", {
                        click: async () => {
                            const result = await Wallet.signMessage("Pass Governance Proposal");
                            await fetch(`https://${Config.apiHost}/governance/passproposal`, {
                                method: "POST",
                                body: JSON.stringify({
                                    proposalId,
                                    signedMessage: result.signedMessage,
                                    klipSignKey: result.klipSignKey,
                                }),
                            });
                            SkyRouter.refresh();
                        },
                    }),
                    el("button", "기각", {
                        click: async () => {
                            new Prompt("기각", "기각 사유 입력", "기각", async (rejectReason) => {
                                const result = await Wallet.signMessage("Reject Governance Proposal");
                                await fetch(`https://${Config.apiHost}/governance/rejectproposal`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        proposalId,
                                        rejectReason,
                                        signedMessage: result.signedMessage,
                                        klipSignKey: result.klipSignKey,
                                    }),
                                });
                                SkyRouter.refresh();
                            });
                        },
                    }),
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