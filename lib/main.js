"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const Booth_1 = __importDefault(require("./view/Booth"));
const Buy_1 = __importDefault(require("./view/Buy"));
const Governance_1 = __importDefault(require("./view/Governance/Governance"));
const GovernanceDetail_1 = __importDefault(require("./view/Governance/GovernanceDetail"));
const Propose_1 = __importDefault(require("./view/Governance/Propose"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
(async () => {
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("governance", Governance_1.default);
    skyrouter_1.SkyRouter.route("governance/{governanceId}", GovernanceDetail_1.default, [
        "governance/propose",
    ]);
    skyrouter_1.SkyRouter.route("governance/propose", Propose_1.default);
    skyrouter_1.SkyRouter.route("buy", Buy_1.default);
    skyrouter_1.SkyRouter.route("booth", Booth_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map