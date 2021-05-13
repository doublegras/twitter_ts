"use strict";
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = require("passport");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router.get("/signin/form", auth_controller_1["default"].signInForm);
router.post("/signin", auth_controller_1["default"].signIn);
router.get("/signout", auth_controller_1["default"].signOut);
router.get("/google", auth_controller_1["default"].googleAuth);
router.get("/google/cb", passport_1["default"].authenticate("google"), function (req, res) {
    req.login(req.user);
    res.redirect("/tweets");
});
exports["default"] = router;
