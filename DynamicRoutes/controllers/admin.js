const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(req.body.id,title, imageUrl, description, price);
  product.save();
  res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};


exports.editProduct = (req,res,next) =>{
  Product.fetchAll((prod)=>{
    let arr = prod.filter((a)=>a.id == req.params.id);
    
    Product.deleteById(req.params.id);

    res.render('admin/edit-product', {
      product: arr[0] ,
      pageTitle: 'Admin Products',
      path: '/admin/edit-product'
    });
        
    })



}