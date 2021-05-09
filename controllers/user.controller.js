const serviceUser = require("../services/user.service");
const serviceTweet = require("../services/tweet.service");
const emailFactory = require("../email/email");
const dns = require("dns");
// const emailValidator = require("deep-email-validator");
const path = require("path");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const User = require("../database/models/user.model");

const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, path.join(__dirname, "../public/images/avatar"));
    },
    filename: (req, file, done) => {
      done(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 150000, // bytes
  },

  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      callback(new Error("Only images are allowed"));
    } else {
      callback(null, true);
    }
  },
});

const controllerUser = {
  newUser: (req, res, next) => {
    res.render("user/user-form");
  },

  userSignUp: async (req, res, next) => {
    try {
      const body = req.body;
      const domain = body.email.split("@")[1];
      dns.resolveMx(domain, (err, addresse) => {
        if (err) {
          console.log(err);
          res.render("user/user-form", {
            errors: ["no mx record for domain"],
          });
        }
      });
      //const { valid, validators } = await emailValidator.validate(body.email);
      const user = await serviceUser.userCreate(body);
      emailFactory.sendVerificationEmail({
        to: user.local.email,
        host: req.headers.host,
        username: user.username,
        userId: user.id,
        token: user.local.emailToken,
      });
      req.login(user);
      res.redirect("/tweets");
    } catch (err) {
      console.log(err);
      res.render("user/user-form", {
        error: [err.message],
      });
      next(err);
    }
  },

  uploadImage: [
    upload.single("avatar"),
    async (req, res, next) => {
      try {
        const user = req.user;
        user.avatar = `/images/avatar/${req.file.filename}`;
        await user.save();
        res.redirect("/");
      } catch (e) {
        next(e);
      }
    },
  ],

  userProfile: async (req, res, next) => {
    try {
      const username = req.params.username;
      const user = await serviceUser.findUserPerUsername(username);
      const tweets = await serviceTweet.getUserTweetsFromUsername(user.id);
      res.render("tweets/tweet", {
        tweets,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
        user: user,
        editable: false,
      });
    } catch (err) {
      next(err);
    }
  },

  userList: async (req, res, next) => {
    try {
      const search = req.query.search;
      const users = await serviceUser.searchUserPerUsername(search);
      res.render("include/search-menu", { users });
    } catch (err) {
      next(err);
    }
  },

  followUser: async (req, res, next) => {
    try {
      console.log("test");
      const userId = req.params.userId;
      // les deux promesses ne dépendant pas l'une de l'autre, elles peuvent être éxécutées en parallèle
      // [, user] assigne uniquement la 2e promesse à une variable (user)
      const [, user] = await Promise.all([
        serviceUser.addUserIdToCurrentUserFollowing(req.user, userId),
        serviceUser.findUserPerId(userId),
      ]);
      res.redirect(`/user/${user.username}`);
    } catch (err) {
      next(err);
    }
  },

  unfollowUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const [, user] = await Promise.all([
        serviceUser.removeUserIdToCurrentUserFollowing(req.user, userId),
        serviceUser.findUserPerId(userId),
      ]);
      res.redirect(`/user/${user.username}`);
    } catch (err) {
      next(err);
    }
  },

  emailVerification: async (req, res, next) => {
    try {
      const { userId, userToken } = req.params;
      const user = await serviceUser.findUserPerId(userId);
      if (user && userToken && userToken === user.local.emailToken) {
        user.local.emailVerified = true;
        await user.save();
        res.redirect("/tweets");
      } else {
        res.status(400).json("problem during email verification");
      }
    } catch (err) {
      next(err);
    }
  },

  initResetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (email) {
        const user = await serviceUser.findUserPerEmail(email);
        if (user) {
          user.local.passwordToken = uuidv4();
          console.log("token: ", user.local.passwordToken);
          user.local.passwordTokenExpiration = moment()
            .add(2, "hours")
            .toDate();
          await user.save();
          emailFactory.sendResetPasswordLink({
            to: email,
            host: req.headers.host,
            userId: user.id,
            token: user.local.passwordToken,
          });
          res.status(200).end();
        } else {
          res.status(400).json("email unknown");
        }
      }
    } catch (err) {
      next(err);
    }
  },

  resetPasswordForm: async (req, res, next) => {
    try {
      const { userId, token } = req.params;
      const user = await serviceUser.findUserPerId(userId);
      if (user && user.local.passwordToken === token) {
        res.render("auth/auth-reset-password", {
          url: `https://${req.headers.host}/user/reset-password/${user.id}/${user.local.passwordToken}`,
          errors: null,
          isAuthenticated: false,
        });
      }
      res.status(400).json("Cette utilisateur n'existe pas");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { userId, token } = req.params;
      const { password } = req.body;
      const user = await serviceUser.findUserPerId(userId);
      if (
        password &&
        user &&
        user.local.passwordToken === token &&
        moment() < moment(user.local.passwordTokenExpiration)
      ) {
        user.local.password = await User.hashPassword(password);
        user.local.passwordToken = null;
        user.local.passwordTokenExpiration = null;
        await user.save();
        res.redirect("/");
      } else {
        res.render("auth/auth-reset-password", {
          url: `https://${req.headers.host}/user/reset-password/${user.id}/${user.local.passwordToken}`,
          errors: ["une erreur s'est produite"],
          isAuthenticated: false,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controllerUser;
