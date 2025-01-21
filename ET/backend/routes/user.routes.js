const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers.js');

const {forgotPassword} = require('../controllers/forgotPassword.js');

// route to send password reset mail
router.post('/password/forgotpassword', forgotPassword);

router.post('/user/signup', userController.postUser);
router.post('/user/login', userController.getUser);


module.exports = router;