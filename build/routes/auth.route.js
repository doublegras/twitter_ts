"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.Router();
router.get("/signin/form", auth_controller_1.default.signInForm);
router.post("/signin", auth_controller_1.default.signIn);
router.get("/signout", auth_controller_1.default.signOut);
router.get("/google", auth_controller_1.default.googleAuth);
router.get("/google/cb", passport_1.default.authenticate("google"), (req, res) => {
    req.login(req.user);
    res.redirect("/tweets");
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map