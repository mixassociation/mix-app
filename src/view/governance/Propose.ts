import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import Confirm from "../../component/dialogue/Confirm";
import Prompt from "../../component/dialogue/Prompt";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import Layout from "../Layout";
import ViewUtil from "../ViewUtil";

export default class Propose implements View {

    private container: DomNode;
    private proposer: DomNode;

    constructor() {
        Layout.current.title = "거버넌스 제안";

        let titleInput: DomNode<HTMLInputElement>;
        let summaryInput: DomNode<HTMLTextAreaElement>;
        let contentInput: DomNode<HTMLTextAreaElement>;
        let noteInput: DomNode<HTMLTextAreaElement>;
        let termCheckbox: DomNode<HTMLInputElement>;

        let optionList: DomNode;
        let optionTitles: string[] = [];

        Layout.current.content.append(
            this.container = el(".governance-propose-view",
                el("h1", "거버넌스 제안"),
                el(".form",
                    el("label",
                        el("span", "제목"),
                        titleInput = el("input", { placeholder: "제안 제목을 입력하세요." }),
                    ),
                    el("label",
                        el("span", "요약"),
                        summaryInput = el("textarea", { placeholder: "제안의 핵심적인 부분만 적어주세요." }),
                    ),
                    el("label",
                        el("span", "본문"),
                        el("p", "본문은 마크다운 문법을 사용하실 수 있습니다."),
                        el("a.markdown-button", "마크다운 문법 보기", { href: "https://www.markdownguide.org/cheat-sheet/", target: "_blank" }),
                        contentInput = el("textarea.content", { placeholder: "제안을 설명해주세요." }),
                    ),
                    el("label",
                        el("span", "비고"),
                        noteInput = el("textarea", { placeholder: "비고를 적어주세요." }),
                    ),
                    el(".options",
                        el("h5", "후보 등록"),
                        optionList = el("ul"),
                        el("button", "후보 추가", {
                            click: () => {
                                new Prompt("후보 추가", "선택지로 추가할 후보를 입력해주시기 바랍니다.", "추가하기", (optionTitle) => {
                                    optionTitles.push(optionTitle);
                                    const candidate = el("li", el("span", optionTitle), el("a.delete-button", "삭제", {
                                        click: () => {
                                            SkyUtil.pull(optionTitles, optionTitle);
                                            candidate.delete();
                                        },
                                    })).appendTo(optionList);
                                });
                            },
                        }),
                    ),
                    el(".proposer",
                        el("h5", "제안자"),
                        this.proposer = el("span"),
                    ),
                    el(".term",
                        el("label",
                            termCheckbox = el("input", { type: "checkbox" }),
                            el("p", "제출된 제안을 취소 또는 수정할 수 없음에 동의합니다.\n이 인터페이스는 거버넌스를 위해 본인이 선택한 편리한 도구일뿐이며,\n서명에 따른 모든 결과에 대한 책임은 서명한 지갑 소유주에게 있음에 동의합니다."),
                        ),
                    ),
                    el(".controller",
                        el("button", "제안하기", {
                            click: () => {
                                if (termCheckbox.domElement.checked === true) {
                                    new Confirm("제안하기", "제안을 등록하시겠습니까? 제안 후에는 내용을 수정할 수 없사오니 다시 한 번 확인해주시기 바랍니다.", "제안 등록", async () => {
                                        const walletAddress = await Wallet.loadAddress();
                                        if (walletAddress !== undefined) {
                                            const result = await Wallet.signMessage("Governance Proposal");
                                            await fetch(`https://${Config.apiHost}/governance/propose`, {
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
                                            ViewUtil.go("/governance");
                                        }
                                    });
                                }
                            },
                        }),
                    ),
                ),
            ),
        );

        this.loadAddress();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.loadAddress();
    };

    private async loadAddress() {
        const walletAddress = await Wallet.loadAddress();
        if (walletAddress !== undefined) {
            this.proposer.empty().appendText(walletAddress);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}