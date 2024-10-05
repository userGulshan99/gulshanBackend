const express = require('express');
const router = express.Router();

const shop = require('../controllers/products');

router.get('/', shop.getShop);

module.exports = router;