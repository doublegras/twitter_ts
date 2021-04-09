const router = require('express').Router();
const controllerUser = require('../controllers/user.controller');
const ensureAuthenticated = require('../config/guard.config');

router.get('/signup/form', controllerUser.newUser);
router.post('/signup', controllerUser.createUser);
router.post('/update/image', ensureAuthenticated, controllerUser.uploadImage);//controllerUser.test

module.exports = router;