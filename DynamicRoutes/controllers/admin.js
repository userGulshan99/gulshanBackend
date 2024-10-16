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

// save product in database after adding or editing
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(req.body.id,title, imageUrl, description, price);
  
  product.save()
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch((err)=>console.log(err));

};


// get a list of products added by admin in database
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData])=>{
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((err)=>{
      console.log(err);      
    });

};

// edit the selected product from database
exports.editProduct = (req,res,next) =>{
  
  Product.findById(req.params.id).then(([rows,fieldData])=>{
    res.render('admin/edit-product', {
      product: rows[0],
      pageTitle: 'Admin Products',
      path: '/admin/edit-product'
    });
  }).catch((err)=>{
    console.log(err);    
  })

  Product.deleteById(req.params.id);
  
}


  // Method to delete product by id from data
    exports.deleteproductbyID = (req,res,next) =>{
          Product.deleteById(req.params.id);
          res.redirect('/admin/products');
    }