const serviceUser = require('../services/user.service');
const controllerTweet = require('./tweets.controller');
const env = require(`../.env/${ process.env.NODE_ENV }`);
const path = require('path');

const multer = require('multer');
const upload = multer(
  {
    storage: multer.diskStorage({
      destination: (req, file, done) => {
        done(null, env.fileDestination);
      },
      filename: (req, file, done) => {
        done(null, `${ Date.now() } - ${ file.originalname }`);
      }
    })
  }
)

const controllerUser = {

  newUser: (req, res, next) => {
    res.render('user/user-form');
  },

  createUser: async (req, res, next) => {
    try {
      const body = req.body;
      const user = await serviceUser.userCreate(body);
      req.login(user, (err) => {
        err ? next(err) : res.redirect('/');
      })
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  uploadImage: [ 
    upload.single('avatar'),
    async (req, res, next) => {
      try {
        const user = req.user;
        user.avatar = `/images/avatar/${ req.file.filename }`;
        await user.save();
        res.redirect('/');
      } catch(e) {
        next(e);
      }
    }
  ],

}

module.exports = controllerUser;