"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _env_1 = __importDefault(require("../.env"));
const env = _env_1.default[process.env.NODE_ENV];
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const user_service_1 = __importDefault(require("../services/user.service"));
const app_1 = __importDefault(require("../app"));
app_1.default.use(passport_1.default.initialize());
passport_1.default.use("google", new GoogleStrategy({
    clientID: env.googleAuthClientId,
    clientSecret: env.googleAuthClientSecret,
    callbackURL: "/auth/google/cb",
}, async (_, __, profile, done) => {
    try {
        const user = await user_service_1.default.findUserPerGoogleId(profile.id);
        if (user) {
            done(null, user);
        }
        else {
            const email = profile.emails[0].value;
            const username = profile.displayName;
            const googleId = profile.id;
            const newUser = await user_service_1.default.createGoogleUser(username, email, googleId);
            done(null, newUser);
        }
    }
    catch (err) {
        done(err);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await user_service_1.default.findUserPerId(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
//# sourceMappingURL=passport.config.js.map