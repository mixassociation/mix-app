import { DomNode, el } from "@hanul/skynode";
import ViewUtil from "../view/ViewUtil";

export default class Proposal extends DomNode {

    constructor(
        id: string,
        title: string,
        status: string
    ) {
        super("a.proposal");
        this.append(
            el("h5", title),
            el(".status", status),
        );
        this.onDom("click", () => {
            ViewUtil.go(`/governance/${id}`);
        });
    }
}