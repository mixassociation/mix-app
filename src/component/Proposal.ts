import { DomNode, el } from "@hanul/skynode";
import Constants from "../Constants";
import ViewUtil from "../view/ViewUtil";

interface GovernanceProposalOption {
    title: string,
    voters: string[],
    revoters?: string[],
}

interface GovernanceProposal {
    id: string,

    proposer: string,
    title: string,
    summary: string,
    content: string,
    note: string,
    passed: boolean,
    passTime?: number,

    rejected?: boolean,
    rejectReason?: string,

    voters: string[],
    revoters?: string[],

    options: GovernanceProposalOption[],
}

export default class Proposal extends DomNode {

    constructor(proposal: GovernanceProposal) {
        super("a.proposal");
        if (proposal.rejected === true) {
            this.addClass("rejected");
        }
        if (proposal.passed === true) {
            if (proposal.passTime! + Constants.VOTE_PERIOD - Date.now() < 0) {
                this.addClass("ended");
            } else {
                this.addClass("passed");
            }
        }
        this.append(
            el("h5", proposal.title),
            el(".status", proposal.rejected == true ? "기각" : (
                proposal.passed == true ? (
                    proposal.passTime! + Constants.VOTE_PERIOD - Date.now() < 0 ? "투표 종료" : "투표중"
                ) : "검토중"
            )),
        );
        this.onDom("click", () => {
            ViewUtil.go(`/governance/${proposal.id}`);
        });
    }
}