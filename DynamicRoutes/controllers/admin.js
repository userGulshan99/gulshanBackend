const { where } = require('sequelize');
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
  
  Product.create({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description
  })
  .then(()=>{
    res.redirect('/admin/products');
    console.log('created');
  }).catch((err)=>{
    console.log(err);    
  })

};

// get a list of products added by admin in database
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          });
  })
  .catch((err)=>{
    console.log(err);
  })
}


// edit the selected product from database
exports.editProduct = (req,res,next) =>{
  
  Product.findAll({
    where: {
      id : req.params.id
    }
  }).then((data)=>{
    
    res.render('admin/edit-product', {
          product: data[0],
          pageTitle: 'Admin Products',
          path: '/admin/edit-product'
        });
        return data[0].destroy();
  }).catch((err)=>{console.log(err)});

}


  // Method to delete product by id from data
  exports.deleteproductbyID = (req,res,next) =>{
    Product.findByPk(req.params.id).then((data)=>{
      return data.destroy();
    }).catch((err)=>{
      console.log(err);
      return;
    })
  }