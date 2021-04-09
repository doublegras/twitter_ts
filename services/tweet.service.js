const Tweets = require('../database/models/tweets.model');

const serviceTweet = {

  getTweets: () => {
    return Tweets.find({}).exec();
  },

  createTweet: (body) => {
    const newTweet = new Tweets(body);
    return newTweet.save();
  },

  deleteTweet: (tweetId) => {
    return Tweets.findByIdAndDelete(tweetId).exec();
  },

  getTweetById: (tweetId) => {
    return Tweets.findById(tweetId).exec();
  },

  updateTweet: (tweetId, tweet) => {
    return Tweets.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true }).exec();
  }
}

module.exports = serviceTweet;