const express = require('express');
const router = express.Router();

const AddProduct = require('../controllers/products');

router.get('/add-product',AddProduct.getAddProduct);

router.post('/add-product',AddProduct.postAddProduct);

module.exports = router;