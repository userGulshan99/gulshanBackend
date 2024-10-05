const path = require('path');
const rootDir = require('../util/path.js');

exports.getAddProduct = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
};

exports.postAddProduct = (req,res,next)=>{
    res.redirect('/');
};

exports.getShop = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','shop.html'));
};



exports.getContactus = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contactus.html'));
};

exports.postContactus = (req,res,next)=>{
    res.redirect('/success');
};

exports.success = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
};