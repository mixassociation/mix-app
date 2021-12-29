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
import DevFund from "./view/DevFund";

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
    SkyRouter.route("devfund", DevFund);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();