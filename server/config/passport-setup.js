const passport = require('passport');
const YouTube = require('passport-youtube-v3');

const dotenv = require('dotenv').load()

passport.use(new YouTube({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}),
() => {
  console.log('Passport Callback function');
}
);