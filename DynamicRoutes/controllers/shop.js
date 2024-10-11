const Product = require('../models/product');
const Cart = require('../models/cart');

  exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    });
  };

  // controller for getting product with specific Id
  exports.getProductWithId = (req,res,next) =>{
    const prodId = req.params.productId;

    Product.findById(prodId, (prod)=>{        
      res.render('shop/product-detail.ejs',{
        product:prod,
        pageTitle:prod.title,
        path:'/products'
      });
    })
  }

  exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };


  // get cart to see cart products
  exports.getCart = (req, res, next) => {

    Cart.get(products => {
      if(!products){
        res.redirect('/PageNotFound');      
        return;
      }
      res.render('shop/cart.ejs', {
        prods: products.products,
        price:products.price,
        pageTitle: 'cart',
        path: '/cart'
      });
    });
  };

// post cart to add product in cart
exports.postCart = (req,res,next)=>{
  Cart.addToCart(req.body);
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
