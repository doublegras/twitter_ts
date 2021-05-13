import serviceTweet from "../services/tweet.service";
import { Request, Response, NextFunction } from "express";

const controllerTweet = {
  tweetList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const tweets = await serviceTweet.getFollowersAndPersonalTweets(user!);
      res.render("tweets/tweet", {
        tweets,
        isAuthenticated: req.isAuthenticated(),
        currentUser: user,
        user: user,
        editable: true,
      });
    } catch (err) {
      next(err);
    }
  },

  tweetNew: (req: Request, res: Response, _: any) => {
    res.render("tweets/tweet-form", {
      tweet: {},
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
    }); //on donne un objet tweet vide pour eviter les erreurs
  },

  tweetCreate: async (req: Request, res: Response, _: any) => {
    try {
      const body = req.body;
      await serviceTweet.createTweet({
        ...body,
        author: req.user!.id,
      });
      res.redirect("/tweets");
    } catch (err) {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      console.log({ errors });
      res.status(400).render("tweets/tweet-form", {
        errors,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
      });
    }
  },

  tweetDelete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tweetId: string = req.params.tweetId;
      await serviceTweet.deleteTweet(tweetId);
      const tweets = await serviceTweet.getFollowersAndPersonalTweets(
        req.user!
      );
      res.render("tweets/tweet-list", {
        tweets,
        editable: true,
        currentUser: req.user,
      });
    } catch (err) {
      next(err);
    }
  },

  tweetEdit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tweetId = req.params.tweetId;
      const tweet = await serviceTweet.getTweetById(tweetId);
      res.render("tweets/tweet-form", {
        tweet,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
        user: req.user,
      });
    } catch (err) {
      next(err);
    }
  },

  tweetUpdate: async (req: Request, res: Response, _: any) => {
    const tweetId = req.params.tweetId;
    try {
      const body = req.body;
      await serviceTweet.updateTweet(tweetId, body);
      res.redirect("/tweets");
    } catch (err) {
      const errors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      const tweet = await serviceTweet.getTweetById(tweetId);
      res.status(400).render("tweets/tweet-form", { errors, tweet });
    }
  },
};

export default controllerTweet;
