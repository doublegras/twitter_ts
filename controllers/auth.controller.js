const passport = require("passport");
const serviceUser = require("../services/user.service");
const jwt = require("jsonwebtoken");

const controllerAuth = {
  signInForm: (req, res, next) => {
    res.render("auth/auth-form", { errors: null });
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await serviceUser.findUserPerEmail(email);
      if (user) {
        const match = await user.comparePassword(password);
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

  signOut: (req, res, next) => {
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

module.exports = controllerAuth;
