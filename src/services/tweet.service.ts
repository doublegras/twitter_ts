import Tweets from "../database/models/tweets.model";
import { ITweet, IUser } from "../interfaces";

const serviceTweet = {
  getFollowersAndPersonalTweets: (user: IUser) => {
    if (user.following) {
      return Tweets.find({ author: { $in: [...user.following, user.id] } })
        .populate("author")
        .exec();
    } else {
      return null;
    }
    //$in selection les documents qui match avec ceux passés dans le tableau
    //ici on récupère les tweets du user ceux de ces abonnés
    //populate permet de récupérer un document a partir d'un id
    //populate permet ici de récupérer les documents liés au auteurs des tweets
  },

  createTweet: (tweet: ITweet) => {
    const newTweet = new Tweets(tweet);
    return newTweet.save();
  },

  deleteTweet: (tweetId: string) => {
    return Tweets.findByIdAndDelete(tweetId).exec();
  },

  getTweetById: (tweetId: string) => {
    return Tweets.findById(tweetId).exec();
  },

  updateTweet: (tweetId: string, tweet: ITweet) => {
    return Tweets.findByIdAndUpdate(
      tweetId,
      { $set: tweet },
      { runValidators: true }
    ).exec();
  },

  getUserTweetsFromUsername: (authorId: string) => {
    return Tweets.find({ author: authorId }).populate("author").exec();
  },
};

export default serviceTweet;
