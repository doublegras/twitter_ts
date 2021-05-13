"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_service_1 = __importDefault(require("../services/user.service"));
const controllerAuth = {
    signInForm: (_, res) => {
        res.render("auth/auth-form", { errors: null });
    },
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await user_service_1.default.findUserPerEmail(email);
            console.log(user);
            if (user) {
                const match = await user.comparePassword(password, user.local.password);
                if (match) {
                    req.login(user);
                    res.redirect("/tweets");
                }
                else {
                    res.render("auth/auth-form", { errors: ["wrong password"] });
                }
            }
            else {
                res.render("auth/auth-form", { errors: ["user not found"] });
            }
        }
        catch (err) {
            next(err);
        }
    },
    signOut: (req, res) => {
        req.logout();
        res.redirect("/auth/signin/form");
    },
    googleAuth: passport_1.default.authenticate("google", {
        session: false,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ],
    }),
    googleAuthCb: passport_1.default.authenticate("google", {
        session: false,
        successRedirect: "/tweets",
        failureRedirect: "/",
    }),
};
exports.default = controllerAuth;
//# sourceMappingURL=auth.controller.js.map