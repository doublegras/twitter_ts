"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const guard_config_1 = require("../config/guard.config");
const router = express_1.Router();
router.get("/", user_controller_1.default.userList);
router.get("/follow/:userId", user_controller_1.default.followUser);
router.get("/unfollow/:userId", user_controller_1.default.unfollowUser);
router.get("/:username", user_controller_1.default.userProfile);
router.get("/signup/form", user_controller_1.default.newUser);
router.post("/signup", user_controller_1.default.userSignUp);
router.post("/update/image", guard_config_1.ensureAuthenticated, user_controller_1.default.uploadImage);
router.get("/email-verification/:userId/:userToken", user_controller_1.default.emailVerification);
router.post("/forgot-password", user_controller_1.default.initResetPassword);
router.get("/reset-password/:userId/:token", user_controller_1.default.resetPasswordForm);
router.post("/reset-password/:userId/:token", user_controller_1.default.resetPassword);
exports.default = router;
//# sourceMappingURL=user.route.js.map