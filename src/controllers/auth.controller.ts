import passport from "passport";
import serviceUser from "../services/user.service";
import { Request, Response, NextFunction } from "express";

const controllerAuth = {
  signInForm: (_: any, res: Response) => {
    res.render("auth/auth-form", { errors: null });
  },

  signIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await serviceUser.findUserPerEmail(email);
      console.log(user);
      if (user) {
        const match = await user.comparePassword(password, user.local.password);
        if (match) {
          req.login(user);
          res.redirect("/tweets");
        } else {
          res.render("auth/auth-form", { errors: ["wrong password"] });
        }
      } else {
        res.render("auth/auth-form", { errors: ["user not found"] });
      }
    } catch (err) {
      next(err);
    }
  },

  signOut: (req: Request, res: Response) => {
    req.logout();
    res.redirect("/auth/signin/form");
  },

  googleAuth: passport.authenticate("google", {
    session: false,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),

  googleAuthCb: passport.authenticate("google", {
    session: false,
    successRedirect: "/tweets",
    failureRedirect: "/",
  }),
};

export default controllerAuth;
