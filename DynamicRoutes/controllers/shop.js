const Product = require('../models/product');
const Cart = require('../models/cart');
const { where } = require('sequelize');

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
  exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then((cart)=>{
      return cart.getProducts();
    })
    .then((products)=>{
console.log(products);
      
      res.render('shop/cart.ejs', {
        prods: products,
        price:products,
        pageTitle: 'cart',
        path: '/cart'
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  };

// // post cart to add product in cart
exports.postCart = (req,res,next)=>{
  let fetchedCart;
  req.user.getCart()
  .then((cart)=>{
    fetchedCart = cart;
    return cart.getProducts({where : { id : req.body.id}});
  })
  .then((products)=>{
    let product;
    if(products.length > 0){
      product = products[0];      
    }
    let newQuantity = 1;
    if(product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }
      return Product.findByPk(req.body.id)
      .then((product)=>{
        return fetchedCart.addProduct(product, {through: {quantity : newQuantity}});
      })
      .then(()=>{
        res.redirect('/cart');
      })
      .catch((err)=>{
        console.log(err);
      })
  })
  .catch((err)=>{
    console.log(err);
  })

};


// // delete the non required product from cart 
exports.deletCartItem = (req,res,next)=>{
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({ where : { id : req.params.id}})
  })
  .then((products)=>{
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then((result)=>{
    res.redirect('/cart');
  })
  .catch((err)=>{
    console.log(err);
  })
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
