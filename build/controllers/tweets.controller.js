"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweet_service_1 = __importDefault(require("../services/tweet.service"));
const controllerTweet = {
    tweetList: async (req, res, next) => {
        try {
            const user = req.user;
            const tweets = await tweet_service_1.default.getFollowersAndPersonalTweets(user);
            res.render("tweets/tweet", {
                tweets,
                isAuthenticated: req.isAuthenticated(),
                currentUser: user,
                user: user,
                editable: true,
            });
        }
        catch (err) {
            next(err);
        }
    },
    tweetNew: (req, res, _) => {
        res.render("tweets/tweet-form", {
            tweet: {},
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
        }); //on donne un objet tweet vide pour eviter les erreurs
    },
    tweetCreate: async (req, res, _) => {
        try {
            const body = req.body;
            await tweet_service_1.default.createTweet({
                ...body,
                author: req.user.id,
            });
            res.redirect("/tweets");
        }
        catch (err) {
            const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
            console.log({ errors });
            res.status(400).render("tweets/tweet-form", {
                errors,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user,
            });
        }
    },
    tweetDelete: async (req, res, next) => {
        try {
            const tweetId = req.params.tweetId;
            await tweet_service_1.default.deleteTweet(tweetId);
            const tweets = await tweet_service_1.default.getFollowersAndPersonalTweets(req.user);
            res.render("tweets/tweet-list", {
                tweets,
                editable: true,
                currentUser: req.user,
            });
        }
        catch (err) {
            next(err);
        }
    },
    tweetEdit: async (req, res, next) => {
        try {
            const tweetId = req.params.tweetId;
            const tweet = await tweet_service_1.default.getTweetById(tweetId);
            res.render("tweets/tweet-form", {
                tweet,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user,
                user: req.user,
            });
        }
        catch (err) {
            next(err);
        }
    },
    tweetUpdate: async (req, res, _) => {
        const tweetId = req.params.tweetId;
        try {
            const body = req.body;
            await tweet_service_1.default.updateTweet(tweetId, body);
            res.redirect("/tweets");
        }
        catch (err) {
            const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
            const tweet = await tweet_service_1.default.getTweetById(tweetId);
            res.status(400).render("tweets/tweet-form", { errors, tweet });
        }
    },
};
exports.default = controllerTweet;
//# sourceMappingURL=tweets.controller.js.map