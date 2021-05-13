import conf from "../.env";
const env = conf[process.env.NODE_ENV as "developpement" | "production"];
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;
import serviceUser from "../services/user.service";
import app from "../app";
import { IUser } from "../interfaces";

app.use(passport.initialize());

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: env.googleAuthClientId,
      clientSecret: env.googleAuthClientSecret,
      callbackURL: "/auth/google/cb",
    },
    async (_, __, profile: any, done: any) => {
      try {
        const user = await serviceUser.findUserPerGoogleId(profile.id);
        if (user) {
          done(null, user);
        } else {
          const email = profile.emails[0].value;
          const username = profile.displayName;
          const googleId = profile.id;
          const newUser = await serviceUser.createGoogleUser(
            username,
            email,
            googleId
          );
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await serviceUser.findUserPerId(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
