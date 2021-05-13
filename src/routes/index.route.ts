import { Router, Response } from "express";
import tweet from "./tweets.route";
import user from "./user.route";
import auth from "./auth.route";
import { ensureAuthenticated } from "../config/guard.config";

const router = Router();

router.use("/tweets", ensureAuthenticated, tweet);
router.use("/user", user);
router.use("/auth", auth);

router.get("/", (_, res: Response) => {
  res.redirect("/tweets");
});

router.get("/protected", ensureAuthenticated, (_, res: Response) => {
  res.render("protected");
});

export default router;
