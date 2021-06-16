"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var tweets_model_1 = __importDefault(require("../database/models/tweets.model"));
var serviceTweet = {
    getFollowersAndPersonalTweets: function (user) {
        if (user.following) {
            return tweets_model_1["default"].find({ author: { $in: __spreadArrays(user.following, [user.id]) } })
                .populate("author")
                .exec();
        }
        else {
            return null;
        }
        //$in selection les documents qui match avec ceux passés dans le tableau
        //ici on récupère les tweets du user ceux de ces abonnés
        //populate permet de récupérer un document a partir d'un id
        //populate permet ici de récupérer les documents liés au auteurs des tweets
    },
    createTweet: function (tweet) {
        var newTweet = new tweets_model_1["default"](tweet);
        return newTweet.save();
    },
    deleteTweet: function (tweetId) {
        return tweets_model_1["default"].findByIdAndDelete(tweetId).exec();
    },
    getTweetById: function (tweetId) {
        return tweets_model_1["default"].findById(tweetId).exec();
    },
    updateTweet: function (tweetId, tweet) {
        return tweets_model_1["default"].findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true }).exec();
    },
    getUserTweetsFromUsername: function (authorId) {
        return tweets_model_1["default"].find({ author: authorId }).populate("author").exec();
    }
};
exports["default"] = serviceTweet;
//# sourceMappingURL=tweet.service.js.map