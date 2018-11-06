const passport = require('passport');
const YouTube = require('passport-youtube-v3');

const CLIENT_ID = '314239737420-gjdh038nnos438r8cv04gi96nsie58n2.apps.googleusercontent.com';

passport.use(new YouTube({
  clientID: CLIENT_ID,
  clientSecret:
}),
() => {
  console.log('Passport Callback function');
}
);