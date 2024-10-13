const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// added dynamic route
router.get('/products/:productId',shopController.getProductWithId);

// see cart items
router.get('/cart', shopController.getCart);

// add items to cart
router.post('/cart', shopController.postCart);

// method to delete cart item
router.get('/deleteCart/:id', shopController.deletCartItem);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);



module.exports = router;
