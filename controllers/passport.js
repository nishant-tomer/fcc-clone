var twitterStrategy = require('passport-twitter').Strategy,
    User = require("../models/user"),
    localStrategy = require("passport-local").Strategy;


module.exports = function (passport){

  passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({username:username}, function(err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false)}
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err) }
            if ( !isMatch ) {
              return done(null, false);
            }
            return done(null, user)
        })
      })
    }
  ))

  passport.use(new twitterStrategy({
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: process.env.APP_URI + '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({ 'uid': profile.id }, function(err, user) {
        if (err) { return done(err) }
        else if (user) { return done(null, user) }
        else {
          console.log(profile.id + profile.username)
          var newUser = new User();
          newUser.uid = profile.id;
          newUser.username = profile.username;
          console.log(newUser)
          newUser.save(function(err) {
              if (err) { console.log(err) ; return done( err ) }
              return done(null, newUser);
          });
        }
      });
    }
  ))
}
