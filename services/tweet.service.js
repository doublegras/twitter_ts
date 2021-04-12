const Tweets = require('../database/models/tweets.model');

const serviceTweet = {

  getFollowersAndPersonalTweets: (user) => {
    return Tweets.find({ author: { $in: [ ...user.following, user._id ] }}).populate('author').exec();
    //$in selection les documents qui match avec ceux passés dans le tableau
    //ici on récupère les tweets du user ceux de ces abonnés
    //populate permet de récupérer un document a partir d'un id
    //populate permet ici de récupérer les documents liés au auteurs des tweets
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
  },

  getUserTweetsFromUsername: (authorId) => {
    return Tweets.find({ author: authorId }).populate('author').exec();
  }
}

module.exports = serviceTweet;