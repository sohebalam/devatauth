// import { findUserForAuth, findUserWithEmailAndPassword } from '@/api-lib/db';
import passport from 'passport';
var GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  findUserForAuth(req.db, id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

export default passport;
