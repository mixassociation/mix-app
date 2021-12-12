import { DomNode, el } from "@hanul/skynode";

export default class Proposal extends DomNode {

    public content: DomNode;

    constructor(
        serial: string,
        title: string,
        status: string
    ) {
        super(".proposal-view");
        this.append(
            this.content = el(".proposal",
                el(".serial", serial),
                el("h5", title),
                el(".status", status),
            )
        );
    }
}