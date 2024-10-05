const express = require('express');
const router = express.Router();

const message = require('../controllers/products');

router.get('/success', message.success);

module.exports = router;