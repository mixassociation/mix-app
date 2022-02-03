import { SkyRouter } from "skyrouter";
import AssetsCalculator from "./AssetsCalculator";
import Booth from "./view/Booth";
import Buy from "./view/Buy";
import Governance from "./view/governance/Governance";
import Proposal from "./view/governance/Proposal";
import Propose from "./view/governance/Propose";
import Home from "./view/Home";
import Layout from "./view/Layout";
import Mining from "./view/Mining";
import BurnPool from "./view/BurnPool";
import Burn from "./view/Burn";
import DevFund from "./view/DevFund";

import Turntable from "./view/turntable/Turntable";
import BuyTurntable from "./view/turntable/BuyTurntable";
import TurntableDetail from "./view/turntable/Detail";
import Update from "./view/turntable/Update";
import AddMates from "./view/turntable/AddMates";
import RemoveMates from "./view/turntable/RemoveMates";
import MiningMates from "./view/turntable/MiningMates";
import MateHolders from "./view/turntable/MateHolders";

(async () => {

    await AssetsCalculator.init();

    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("governance", Governance);
    SkyRouter.route("governance/{proposalId}", Proposal, [
        "governance/propose",
    ]);
    SkyRouter.route("governance/propose", Propose);

    SkyRouter.route("buy", Buy);
    SkyRouter.route("mining", Mining);
    SkyRouter.route("booth", Booth);
    SkyRouter.route("burnpool", BurnPool);
    SkyRouter.route("burn", Burn);
    SkyRouter.route("devfund", DevFund);

    SkyRouter.route("turntable", Turntable);
    SkyRouter.route("turntable/buy", BuyTurntable);
    SkyRouter.route("turntable/{id}", TurntableDetail, ["turntable/buy"]);
    SkyRouter.route("turntable/{id}/update", Update);
    SkyRouter.route("turntable/{id}/addmates", AddMates);
    SkyRouter.route("turntable/{id}/removemates", RemoveMates);
    SkyRouter.route("turntable/{id}/miningmates", MiningMates);
    SkyRouter.route("turntable/{id}/mateholders", MateHolders);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();