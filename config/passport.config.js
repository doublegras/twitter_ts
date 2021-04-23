const env = require(`../.env/${ process.env.NODE_ENV }`);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const serviceUser = require('../services/user.service');
const app = require('../app');
const jwtConfig = require('./jwt.config');

app.use(passport.initialize());

passport.use('google', new GoogleStrategy({
  clientID: env.googleAuthClientId,
  clientSecret: env.googleAuthClientSecret,
  callbackURL: '/auth/google/cb',
}, async (accessToken, refreshToken, profile, done, req, res) => {
  try {
    const user = await serviceUser.findUserPerGoogleId(profile.id);
    if (user) {
      done(null, user);
    } else {
      const email = profile.emails[0].value;
      const username = profile.displayName;
      const googleId = profile.id;
      const newUser = await serviceUser.createGoogleUser(username, email, googleId);
      done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await serviceUser.findUserPerId(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
})
