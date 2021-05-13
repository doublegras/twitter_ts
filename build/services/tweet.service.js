"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweets_model_1 = __importDefault(require("../database/models/tweets.model"));
const serviceTweet = {
    getFollowersAndPersonalTweets: (user) => {
        if (user.following) {
            return tweets_model_1.default.find({ author: { $in: [...user.following, user.id] } })
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
    createTweet: (tweet) => {
        const newTweet = new tweets_model_1.default(tweet);
        return newTweet.save();
    },
    deleteTweet: (tweetId) => {
        return tweets_model_1.default.findByIdAndDelete(tweetId).exec();
    },
    getTweetById: (tweetId) => {
        return tweets_model_1.default.findById(tweetId).exec();
    },
    updateTweet: (tweetId, tweet) => {
        return tweets_model_1.default.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true }).exec();
    },
    getUserTweetsFromUsername: (authorId) => {
        return tweets_model_1.default.find({ author: authorId }).populate("author").exec();
    },
};
exports.default = serviceTweet;
//# sourceMappingURL=tweet.service.js.map