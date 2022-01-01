"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const AssetsCalculator_1 = __importDefault(require("./AssetsCalculator"));
const Booth_1 = __importDefault(require("./view/Booth"));
const Buy_1 = __importDefault(require("./view/Buy"));
const Governance_1 = __importDefault(require("./view/governance/Governance"));
const Proposal_1 = __importDefault(require("./view/governance/Proposal"));
const Propose_1 = __importDefault(require("./view/governance/Propose"));
const Home_1 = __importDefault(require("./view/Home"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Mining_1 = __importDefault(require("./view/Mining"));
const BurnPool_1 = __importDefault(require("./view/BurnPool"));
const DevFund_1 = __importDefault(require("./view/DevFund"));
(async () => {
    await AssetsCalculator_1.default.init();
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Home_1.default);
    skyrouter_1.SkyRouter.route("governance", Governance_1.default);
    skyrouter_1.SkyRouter.route("governance/{proposalId}", Proposal_1.default, [
        "governance/propose",
    ]);
    skyrouter_1.SkyRouter.route("governance/propose", Propose_1.default);
    skyrouter_1.SkyRouter.route("buy", Buy_1.default);
    skyrouter_1.SkyRouter.route("mining", Mining_1.default);
    skyrouter_1.SkyRouter.route("booth", Booth_1.default);
    skyrouter_1.SkyRouter.route("burnpool", BurnPool_1.default);
    skyrouter_1.SkyRouter.route("devfund", DevFund_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map