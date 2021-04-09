const router = require('express').Router();
const controllerAuth = require('../controllers/auth.controller');

router.get('/signin/form', controllerAuth.sessionNew);
router.post('/signin', controllerAuth.sessionCreate);
router.get('/signout',controllerAuth.sessionDelete);
router.get('/google', controllerAuth.googleAuth);
router.get('/google/cb', controllerAuth.googleAuthCb);


module.exports = router;