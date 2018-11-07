const express = require('express');
const router = express.Router();
const passport = require('passport');
const YouTubeStrategy = require('passport-youtube-v3');

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