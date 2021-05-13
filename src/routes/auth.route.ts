import { Router, Request, Response } from "express";
import passport from "passport";
import controllerAuth from "../controllers/auth.controller";

const router = Router();

router.get("/signin/form", controllerAuth.signInForm);
router.post("/signin", controllerAuth.signIn);
router.get("/signout", controllerAuth.signOut);
router.get("/google", controllerAuth.googleAuth);
router.get(
  "/google/cb",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    req.login(req.user!);
    res.redirect("/tweets");
  }
);

export default router;
