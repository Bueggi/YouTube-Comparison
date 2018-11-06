const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  console.log('works');
  res.statusCode = 200;
  res.send('Hello world');
});

router.get('*', (_, res) => {
  res.status(404);
  res.send("Hit non existent endpoint");
});

module.exports = router;