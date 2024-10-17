const Product = require('../models/product');
const Cart = require('../models/cart');

//get all products from database
  exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then((products)=>{
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  

  };

  // controller for getting product with specific Id from database

  exports.getProductWithId = (req,res,next) =>{
    const prodId = req.params.productId;

    Product.findByPk(prodId)
    .then((product)=>{  
      res.render('shop/product-detail.ejs',{
        product:product,
        pageTitle:product.title,
        path:'/products'
      });
    }).catch((err)=>{
      console.log(err);
      return;
    });
  }

  //method to show all products to the index page
  exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then((products)=>{
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err)=>{
      console.log(err);
    });

  };


  // get cart to see cart products
//   exports.getCart = (req, res, next) => {

//     Cart.get(products => {
//       if(!products){
//         res.redirect('/PageNotFound');      
//         return;
//       }
//       res.render('shop/cart.ejs', {
//         prods: products.products,
//         price:products.price,
//         pageTitle: 'cart',
//         path: '/cart'
//       });
//     });
//   };

// // post cart to add product in cart
// exports.postCart = (req,res,next)=>{
//   Cart.addToCart(req.body);
//     res.redirect('/cart');
// }

// // delete the non required product from cart 
// exports.deletCartItem = (req,res,next)=>{
//   Cart.deleteItem(req.params.id);
//   res.redirect('/cart');
// }

// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
