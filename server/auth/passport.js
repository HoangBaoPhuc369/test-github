const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { googleClientID, googleClientSecret } = require("../config");

const User = require("../schemas/user.schema.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      if (profile.id) {
        User.findOne({ google_id: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              google_id: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.photos[0].value,
              access_token: accessToken,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    }
  )
);
