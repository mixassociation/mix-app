import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MobileMenu from "../component/menu/MobileMenu";
import PCMenu from "../component/menu/PCMenu";
import UserInfo from "../component/menu/UserInfo";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(
            (this.container = el(".layout",
                el("header",
                    el(".nav",
                        el("a", { click: () => ViewUtil.go("/") },
                            el(".logo",
                                el("img", { src: "/images/logo/logo.svg", height: "20" }),
                            ),
                        ),
                        new PCMenu(),
                        el(".right",
                            new UserInfo(),
                            el("a.menu-button", el("i.fas.fa-bars"), {
                                click: (event, button) => {
                                    const rect = button.rect;
                                    new MobileMenu({ left: rect.right - 170, top: rect.bottom }).appendTo(BodyNode);
                                },
                            })
                        ),
                    )),
                el("main", (this.content = el(".content"))),
                el("footer",
                    "주식회사 디에스씨레이블 | 대표이사 :권태홍 | 사업자번호 :838-86-02498 | 개인정보보호책임자:권태홍\n주소: 대전광역시 유성구 대학로 82, 5층 505호 | mix-works@ayias.io\nCopyright @2021 DSCLabel Inc. ALL RIGHTS RESERVED.",
                ),
            ))
        );
    }

    public set title(title: string) {
        document.title = `${title} | Mix`;
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}