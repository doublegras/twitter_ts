"use strict";
exports.__esModule = true;
var express_1 = require("express");
var tweets_route_1 = require("./tweets.route");
var user_route_1 = require("./user.route");
var auth_route_1 = require("./auth.route");
var guard_config_1 = require("../config/guard.config");
var router = express_1.Router();
router.use("/tweets", guard_config_1.ensureAuthenticated, tweets_route_1["default"]);
router.use("/user", user_route_1["default"]);
router.use("/auth", auth_route_1["default"]);
router.get("/", function (_, res) {
    res.redirect("/tweets");
});
router.get("/protected", guard_config_1.ensureAuthenticated, function (_, res) {
    res.render("protected");
});
exports["default"] = router;
