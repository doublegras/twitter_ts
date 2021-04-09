const env = require(`../.env/${ process.env.NODE_ENV }`);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const serviceUser = require('../services/user.service');
const app = require('../app');

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await serviceUser.findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        done(null, user);
      } else {
        done(null, false, { message: 'wrong password' });
      }
    } else {
      done(null, false, { message: 'user not found' });
    }
  } catch (err) {
    done(err);
  }
}))

passport.use('google', new GoogleStrategy({
  clientID: '509762624184-23j7lfmo9kf9jv1mh27k1cp6j4vsoi62.apps.googleusercontent.com',
  clientSecret: 'h5N4jqmtlifp45Bk_ZsZsqL9',
  callbackURL: '/auth/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
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
