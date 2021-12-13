import { SkyRouter } from "skyrouter";
import Booth from "./view/Booth";
import Buy from "./view/Buy";
import Governance from "./view/Governance/Governance";
import GovernanceDetail from "./view/Governance/GovernanceDetail";
import Propose from "./view/Governance/Propose";
import Home from "./view/Home";
import Layout from "./view/Layout";

(async () => {
    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("governance", Governance);
    SkyRouter.route("governance/{governanceId}", GovernanceDetail, [
        "governance/propose",
    ]);
    SkyRouter.route("governance/propose", Propose);

    SkyRouter.route("buy", Buy);
    SkyRouter.route("booth", Booth);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();