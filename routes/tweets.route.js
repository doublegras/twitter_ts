const router = require('express').Router();
const controller = require('../controllers/tweets.controller');

router.get('/', controller.tweetList);
router.get('/new', controller.tweetNew);
router.get('/edit/:tweetId', controller.tweetEdit);
router.post('/', controller.tweetCreate);
router.post('/update/:tweetId', controller.tweetUpdate);
router.delete('/:tweetId', controller.tweetDelete);

module.exports = router;