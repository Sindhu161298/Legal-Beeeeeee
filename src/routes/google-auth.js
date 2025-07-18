const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Dummy user store
const users = [];

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  const existingUser = users.find(u => u.googleId === profile.id);
  if (existingUser) return done(null, existingUser);

  const newUser = {
    googleId: profile.id,
    username: profile.displayName,
    email: profile.emails[0].value
  };
  users.push(newUser);
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.googleId === id);
  done(null, user);
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login.html',
    successRedirect: '/'
  })
);

module.exports = router; // ✅ Correct export
