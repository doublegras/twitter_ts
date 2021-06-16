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
var user_service_1 = __importDefault(require("../services/user.service"));
var tweet_service_1 = __importDefault(require("../services/tweet.service"));
var email_1 = __importDefault(require("../email/email"));
var dns_1 = __importDefault(require("dns"));
// const emailValidator = require("deep-email-validator");
var path_1 = __importDefault(require("path"));
var moment_1 = __importDefault(require("moment"));
var uuid_1 = require("uuid");
var user_model_1 = __importDefault(require("../database/models/user.model"));
var multer = require("multer");
var upload = multer({
    storage: multer.diskStorage({
        destination: function (_, __, done) {
            done(null, path_1["default"].join(__dirname, "../../public/images/avatar"));
        },
        filename: function (_, file, done) {
            done(null, Date.now() + "-" + file.originalname);
        }
    }),
    limits: {
        fileSize: 150000
    },
    fileFilter: function (_, file, callback) {
        var ext = path_1["default"].extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            callback(new Error("Only images are allowed"));
        }
        else {
            callback(null, true);
        }
    }
});
var controllerUser = {
    newUser: function (_, res) {
        res.render("user/user-form");
    },
    userSignUp: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var body, domain, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    domain = body.email.split("@")[1];
                    dns_1["default"].resolveMx(domain, function (err) {
                        if (err) {
                            console.log(err);
                            res.render("user/user-form", {
                                errors: ["no mx record for domain"]
                            });
                        }
                    });
                    return [4 /*yield*/, user_service_1["default"].userCreate(body)];
                case 1:
                    user = _a.sent();
                    email_1["default"].sendVerificationEmail({
                        to: user.local.email,
                        username: user.username,
                        userId: user.id,
                        token: user.local.emailToken,
                        host: req.headers.host
                    });
                    req.login(user);
                    res.redirect("/tweets");
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.render("user/user-form", {
                        error: [err_1.message]
                    });
                    next(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    uploadImage: [
        upload.single("avatar"),
        function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        user = req.user;
                        if (!user) return [3 /*break*/, 2];
                        user.avatar = "/images/avatar/" + req.file.filename;
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        res.redirect("/");
                        return [3 /*break*/, 3];
                    case 2:
                        res.end();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); },
    ],
    userProfile: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var username, user, tweets, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    username = req.params.username;
                    return [4 /*yield*/, user_service_1["default"].findUserPerUsername(username)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, tweet_service_1["default"].getUserTweetsFromUsername(user.id)];
                case 2:
                    tweets = _a.sent();
                    res.render("tweets/tweet", {
                        tweets: tweets,
                        isAuthenticated: req.isAuthenticated(),
                        currentUser: req.user,
                        user: user,
                        editable: false
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    next(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    userList: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var search, users, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    search = req.query.search;
                    return [4 /*yield*/, user_service_1["default"].searchUserPerUsername(search)];
                case 1:
                    users = _a.sent();
                    res.render("include/search-menu", { users: users });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    next(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    followUser: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, user, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    userId = req.params.userId;
                    return [4 /*yield*/, Promise.all([
                            user_service_1["default"].addUserIdToCurrentUserFollowing(req.user, userId),
                            user_service_1["default"].findUserPerId(userId),
                        ])];
                case 1:
                    _a = _b.sent(), user = _a[1];
                    res.redirect("/user/" + user.username);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _b.sent();
                    next(err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    unfollowUser: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, user, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    userId = req.params.userId;
                    return [4 /*yield*/, Promise.all([
                            user_service_1["default"].removeUserIdToCurrentUserFollowing(req.user, userId),
                            user_service_1["default"].findUserPerId(userId),
                        ])];
                case 1:
                    _a = _b.sent(), user = _a[1];
                    res.redirect("/user/" + user.username);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _b.sent();
                    next(err_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    emailVerification: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, userToken, user, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.params, userId = _a.userId, userToken = _a.userToken;
                    return [4 /*yield*/, user_service_1["default"].findUserPerId(userId)];
                case 1:
                    user = _b.sent();
                    if (!(user && userToken && userToken === user.local.emailToken)) return [3 /*break*/, 3];
                    user.local.emailVerified = true;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    res.redirect("/tweets");
                    return [3 /*break*/, 4];
                case 3:
                    res.status(400).json("problem during email verification");
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_6 = _b.sent();
                    next(err_6);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    initResetPassword: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var email, user, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    email = req.body.email;
                    if (!email) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_service_1["default"].findUserPerEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    user.local.passwordToken = uuid_1.v4();
                    console.log("token: ", user.local.passwordToken);
                    user.local.passwordTokenExpiration = moment_1["default"]()
                        .add(2, "hours")
                        .toDate();
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    email_1["default"].sendResetPasswordLink({
                        to: email,
                        userId: user.id,
                        token: user.local.passwordToken,
                        host: req.headers.host
                    });
                    res.status(200).end();
                    return [3 /*break*/, 4];
                case 3:
                    res.status(400).json("email unknown");
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_7 = _a.sent();
                    next(err_7);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    resetPasswordForm: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, token, user, err_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.params, userId = _a.userId, token = _a.token;
                    return [4 /*yield*/, user_service_1["default"].findUserPerId(userId)];
                case 1:
                    user = _b.sent();
                    if (user && user.local.passwordToken === token) {
                        res.render("auth/auth-reset-password", {
                            url: "https://" + req.headers.host + "/user/reset-password/" + user.id + "/" + user.local.passwordToken,
                            errors: null,
                            isAuthenticated: false
                        });
                    }
                    res.status(400).json("Cette utilisateur n'existe pas");
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _b.sent();
                    console.log(err_8);
                    next(err_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    resetPassword: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, userId, token, password, user, _b, err_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    _a = req.params, userId = _a.userId, token = _a.token;
                    password = req.body.password;
                    return [4 /*yield*/, user_service_1["default"].findUserPerId(userId)];
                case 1:
                    user = _c.sent();
                    if (!(password &&
                        user &&
                        user.local.passwordToken === token &&
                        moment_1["default"]() < moment_1["default"](user.local.passwordTokenExpiration))) return [3 /*break*/, 4];
                    _b = user.local;
                    return [4 /*yield*/, user_model_1["default"].hashPassword(password)];
                case 2:
                    _b.password = _c.sent();
                    user.local.passwordToken = null;
                    user.local.passwordTokenExpiration = null;
                    return [4 /*yield*/, user.save()];
                case 3:
                    _c.sent();
                    res.redirect("/");
                    return [3 /*break*/, 5];
                case 4:
                    res.render("auth/auth-reset-password", {
                        url: "https://" + req.headers.host + "/user/reset-password/" + user.id + "/" + user.local.passwordToken,
                        errors: ["une erreur s'est produite"],
                        isAuthenticated: false
                    });
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_9 = _c.sent();
                    next(err_9);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = controllerUser;
//# sourceMappingURL=user.controller.js.map