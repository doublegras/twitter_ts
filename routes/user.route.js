const router = require('express').Router();
const controllerUser = require('../controllers/user.controller');
const ensureAuthenticated = require('../config/guard.config');

router.get('/', controllerUser.userList);
router.get('/follow/:userId', controllerUser.followUser);
router.get('/unfollow/:userId', controllerUser.unfollowUser);
router.get('/:username', controllerUser.userProfile);
router.get('/signup/form', controllerUser.newUser);
router.post('/signup', controllerUser.userSignUp);
router.post('/update/image', ensureAuthenticated, controllerUser.uploadImage);
router.get('/email-verification/:userId/:userToken', controllerUser.emailVerification);

module.exports = router;