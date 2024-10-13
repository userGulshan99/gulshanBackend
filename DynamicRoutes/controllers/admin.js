const Product = require('../models/product');

// display form to add products
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// save product in file after adding or editing
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(req.body.id,title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
};


// get a list of products added by admin
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

// edit the product
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


  // delete the added product
    exports.deleteproductbyID = (req,res,next) =>{
          Product.deleteById(req.params.id);
          res.redirect('/admin/products');
    }