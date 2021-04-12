const passport = require("passport");

const controllerAuth = {

  sessionNew: (req, res, next) => {
    res.render('auth/auth-form', { errors: null });
  },

  sessionCreate: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        next(err);
      } else if (!user) {
        res.render('auth/auth-form', { errors: info.message });
      } else {
        req.login(user, (err) => {
          err ? next(err) : res.redirect('/');
        })
      }
    })(req, res, next);
  },

  sessionDelete: (req, res, next) => {
    req.logout();
    res.redirect('/');
  },

  googleAuth: (req, res, next) => {
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    })(req, res, next);
  },

  googleAuthCb: (req, res, next) => {
    passport.authenticate('google', {
      successRedirect: '/tweets',
      failureRedirect: '/'
    })(req, res, next);
  }
}

module.exports = controllerAuth;