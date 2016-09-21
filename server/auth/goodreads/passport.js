import passport from 'passport';
import {Strategy as GoodreadsStrategy} from 'passport-goodreads';

export function setup(User, config) {
  passport.use(new GoodreadsStrategy({
      consumerKey: config.goodreads.clientID,
      consumerSecret: config.goodreads.clientSecret,
      callbackURL: config.goodreads.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({'goodreads.id': profile.id}).exec()
        .then(user => {
          if (user) {
            return done(null, user);
          }

          user = new User({
            name: profile.displayName,
            role: 'user',
            provider: 'goodreads',
            goodreads: {id: profile.id}
          });

          user.save()
            .then(savedUser => done(null, savedUser))
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }));
}