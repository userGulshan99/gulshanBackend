const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/products => GET  page to view available products
router.get('/products', adminController.getProducts);

// /admin/add-product => GET redirect to form for adding a new product
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST  submit new product details
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:id', adminController.editProduct);

router.post('/edit-product', adminController.postAddProduct);



module.exports = router;
