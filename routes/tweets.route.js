const router = require('express').Router();
const controllerTweet = require('../controllers/tweets.controller');

router.get('/', controllerTweet.tweetList);
router.get('/new', controllerTweet.tweetNew);
router.get('/edit/:tweetId', controllerTweet.tweetEdit);
router.post('/', controllerTweet.tweetCreate);
router.post('/update/:tweetId', controllerTweet.tweetUpdate);
router.delete('/:tweetId', controllerTweet.tweetDelete);

module.exports = router;