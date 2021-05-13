"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweets_route_1 = __importDefault(require("./tweets.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const guard_config_1 = require("../config/guard.config");
const router = express_1.Router();
router.use("/tweets", guard_config_1.ensureAuthenticated, tweets_route_1.default);
router.use("/user", user_route_1.default);
router.use("/auth", auth_route_1.default);
router.get("/", (_, res) => {
    res.redirect("/tweets");
});
router.get("/protected", guard_config_1.ensureAuthenticated, (_, res) => {
    res.render("protected");
});
exports.default = router;
//# sourceMappingURL=index.route.js.map