const router = require("express").Router();
const tweet = require('./tweets.route');
const user = require('./user.route');
const auth = require('./auth.route');
const ensureAuthenticated = require('../config/guard.config');

router.use('/tweets', ensureAuthenticated, tweet);
router.use('/user', user);
router.use('/auth', auth);

router.get('/', (req, res) => {
  res.redirect('/tweets');
})

router.get('/protected', ensureAuthenticated, (req, res) => {
  res.render('protected');
});

module.exports = router;
