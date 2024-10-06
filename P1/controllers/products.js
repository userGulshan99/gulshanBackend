const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path.js');
const Product = require('../models/product.js');

exports.getAddProduct = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
};

exports.postAddProduct = (req,res,next)=>{
    const p = new Product(req.body.title);
    p.save();
    res.redirect('/');
};

exports.getShop = function (req,res,next){
      Product.fetchAll((a)=>{
        let ans = a.map(element => {
            return `<li>${element.title}</li>`            
        });
        ans = ans.join('');
        ans = `<ul>${ans}</ul>`;
        
        fs.readFile(path.join(rootDir,'views','shop.html'),'utf-8',(err,data)=>{
            res.send(data+ans);                                    
        });

    });
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