import { Router } from "express";
import controllerUser from "../controllers/user.controller";
import { ensureAuthenticated } from "../config/guard.config";

const router = Router();

router.get("/", controllerUser.userList);
router.get("/follow/:userId", controllerUser.followUser);
router.get("/unfollow/:userId", controllerUser.unfollowUser);
router.get("/:username", controllerUser.userProfile);
router.get("/signup/form", controllerUser.newUser);
router.post("/signup", controllerUser.userSignUp);
router.post("/update/image", ensureAuthenticated, controllerUser.uploadImage);
router.get(
  "/email-verification/:userId/:userToken",
  controllerUser.emailVerification
);
router.post("/forgot-password", controllerUser.initResetPassword);
router.get("/reset-password/:userId/:token", controllerUser.resetPasswordForm);
router.post("/reset-password/:userId/:token", controllerUser.resetPassword);

export default router;
