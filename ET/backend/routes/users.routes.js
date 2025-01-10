const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controllers.js');

router.post('/user/signup', userController.postUser);

module.exports = router;