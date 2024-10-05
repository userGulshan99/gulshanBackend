const express = require('express');
const router = express.Router();

const contactus = require('../controllers/products');

router.get('/contactus', contactus.getContactus);

router.post('/contactus', contactus.postContactus);

module.exports = router;