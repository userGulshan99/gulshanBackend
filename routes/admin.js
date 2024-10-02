
const express =require('express');
const router = express.Router();

router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/admin/add-product" method="post"><label for="name"></label><input type="text" name="product_name" id="product_name" placeholder="product name"><input type="number" name="size" id="size" placeholder="what is the size of product?"><button type="submit">Submit</button></form>')
 });

router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');   
});


module.exports = router;