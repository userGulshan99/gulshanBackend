const express =require('express');
const router = express.Router();

const rootDir = require('../util/path.js');

const path = require('path');

router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'..','views','add-product.html'));
});

router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');   
});


module.exports = router;