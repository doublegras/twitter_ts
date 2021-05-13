import { Router } from "express";
import controllerTweet from "../controllers/tweets.controller";

const router = Router();

router.get("/", controllerTweet.tweetList);
router.get("/new", controllerTweet.tweetNew);
router.get("/edit/:tweetId", controllerTweet.tweetEdit);
router.post("/", controllerTweet.tweetCreate);
router.post("/update/:tweetId", controllerTweet.tweetUpdate);
router.delete("/:tweetId", controllerTweet.tweetDelete);

export default router;
