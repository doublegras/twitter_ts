"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var _env_1 = __importDefault(require("../.env"));
var env = _env_1["default"][process.env.NODE_ENV];
var jwtSecret = env.jwtSecret;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_service_1 = __importDefault(require("../services/user.service"));
var createToken = function (userId) {
    var jwtToken = jsonwebtoken_1["default"].sign({
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + 10
    }, jwtSecret);
    return jwtToken;
};
var checkExpirationToken = function (token, res) {
    var tokenExp = token.exp;
    var nowInSec = Math.floor(Date.now() / 1000);
    if (nowInSec <= tokenExp) {
        return token;
    }
    else if (nowInSec > tokenExp && nowInSec - tokenExp < 5) {
        var refreshToken = createToken(token.sub);
        res.cookie("jwt", refreshToken, {
            secure: true,
            httpOnly: true,
            domain: env.domain
        });
        return jsonwebtoken_1["default"].verify(refreshToken, jwtSecret);
    }
    else {
        throw new Error("token expired");
    }
};
var jwtAuth = {
    extractUserFromToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, decodedToken, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.cookies.jwt;
                    if (!token) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    decodedToken = jsonwebtoken_1["default"].verify(token, jwtSecret, {
                        ignoreExpiration: true
                    });
                    decodedToken = checkExpirationToken(decodedToken, res);
                    return [4 /*yield*/, user_service_1["default"].findUserPerId(decodedToken.sub)];
                case 2:
                    user = _a.sent();
                    if (user) {
                        req.user = user;
                        next();
                    }
                    else {
                        res.clearCookie("jwt");
                        res.redirect("/");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.clearCookie("jwt");
                    res.redirect("/");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    next();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); },
    addJwtFeatures: function (req, res, next) {
        req.isAuthenticated = function () { return !!req.user; };
        req.login = function (user) {
            var token = createToken(user.id);
            res.cookie("jwt", token, {
                secure: true,
                httpOnly: true,
                domain: env.domain
            });
            console.log(user + ", vient de se connecter");
        };
        req.logout = function () { return res.clearCookie("jwt"); };
        next();
    }
};
exports["default"] = jwtAuth;
//# sourceMappingURL=jwt.config.js.map