const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers.js');

router.post('/user/signup', userController.postUser);
router.post('/user/login', userController.getUser);


module.exports = router;