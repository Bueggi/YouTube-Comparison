const express = require('express');
const router = express.Router();
const passport = require("passport");
const YouTubeStrategy = require("passport-youtube-v3").0AuthStrategy;
const mongoose = require('mongoose');

passport.use(new YouTubeStrategy({
  client_id: '314239737420-gjdh038nnos438r8cv04gi96nsie58n2.apps.googleusercontent.com',
  client_secret: 'tQ71yzS8aLV4QHK1wvTumL1l'
}));

router.get('/', (req, res)=>{
  console.log('works');
  res.statusCode = 200;
  res.send('Hello world');
});

router.get('/authWithYouTube', () => {});

router.get('/login', () => {});

router.get('/logout', () => {})

router.get('*', (_, res) => {
  res.status(404);
  res.send("Hit non existent endpoint");
});

module.exports = router;