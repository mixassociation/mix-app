import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Home from "./view/Home";
import Buy from "./view/Buy";

(async () => {
    SkyRouter.route("**", Layout);
    SkyRouter.route("", Home);

    SkyRouter.route("buy", Buy);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();