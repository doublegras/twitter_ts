const router = require('express').Router();
const passport = require('passport');
const controllerAuth = require('../controllers/auth.controller');

router.get('/signin/form', controllerAuth.signInForm);
router.post('/signin', controllerAuth.signIn);
router.get('/signout',controllerAuth.signOut);
router.get('/google', controllerAuth.googleAuth);
router.get('/google/cb', passport.authenticate('google'), (req, res) => {
  req.login(req.user);
  console.log(req.user);
  res.redirect('/tweets');
});


module.exports = router;