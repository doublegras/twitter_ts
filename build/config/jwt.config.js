"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _env_1 = __importDefault(require("../.env"));
const env = _env_1.default[process.env.NODE_ENV];
const jwtSecret = env.jwtSecret;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const createToken = (userId) => {
    const jwtToken = jsonwebtoken_1.default.sign({
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 20,
    }, jwtSecret);
    return jwtToken;
};
const checkExpirationToken = (token, res) => {
    const tokenExp = token.exp;
    const nowInSec = Math.floor(Date.now() / 1000);
    if (nowInSec <= tokenExp) {
        return token;
    }
    else if (nowInSec > tokenExp && nowInSec - tokenExp < 86400 * 14) {
        const refreshToken = createToken(token.sub);
        res.cookie("jwt", refreshToken, {
            secure: true,
            httpOnly: true,
            domain: env.domain,
        });
        return jsonwebtoken_1.default.verify(refreshToken, jwtSecret);
    }
    else {
        throw new Error("token expired");
    }
};
const jwtAuth = {
    extractUserFromToken: async (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
            try {
                let decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret, {
                    ignoreExpiration: true,
                });
                decodedToken = checkExpirationToken(decodedToken, res);
                const user = await user_service_1.default.findUserPerId(decodedToken.sub);
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    res.clearCookie("jwt");
                    res.redirect("/");
                }
            }
            catch (err) {
                res.clearCookie("jwt");
                res.redirect("/");
            }
        }
        else {
            next();
        }
    },
    addJwtFeatures: (req, res, next) => {
        req.isAuthenticated = () => !!req.user;
        req.login = (user) => {
            const token = createToken(user.id);
            res.cookie("jwt", token, {
                secure: true,
                httpOnly: true,
                domain: env.domain,
            });
            console.log(`${user}, vient de se connecter`);
        };
        req.logout = () => res.clearCookie("jwt");
        next();
    },
};
exports.default = jwtAuth;
//# sourceMappingURL=jwt.config.js.map