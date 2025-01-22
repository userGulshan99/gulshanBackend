const express = require('express');
const router = express.Router();

const {forgotPassword, checkResetPasswordRequest, setNewPassword} = require('../controllers/passwordRequests.controllers.js');

// route to send password reset mail
router.post('/forgotpassword', forgotPassword);

router.get('/resetpassword/:id', checkResetPasswordRequest);

router.post('/resetpassword/:id', setNewPassword);

module.exports = router;