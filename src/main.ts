import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Home from "./view/Home";
import Buy from "./view/Buy";
import Booth from "./view/Booth";
import Governance from "./view/Governance/Governance";
import GovernanceDetail from "./view/Governance/GovernanceDetail";

(async () => {
    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("governance", Governance);
    SkyRouter.route("governance/{governanceId}", GovernanceDetail);

    SkyRouter.route("buy", Buy);
    SkyRouter.route("booth", Booth);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();