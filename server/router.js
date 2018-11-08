const express = require('express');
const router = express.Router();
const userController = require('./controller/logInController')

const authorize = async (req, res, next) => {
  if (!req.user) {
      res.status = 401;
      return;
  }
  console.log('/////////', req.user, res.user)
  await next();
};

router.get('/login', authorize, userController.login)
router.post('/auth/google', userController.authGoogle);



module.exports = router;