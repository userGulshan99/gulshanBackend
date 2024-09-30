const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="post"><label for="name"></label><input type="text" name="product_name" id="product_name" placeholder="product name"><input type="number" name="size" id="size" placeholder="what is the size of product?"><button type="submit">Submit</button></form>')
 });

 app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');   
 });
 
 app.use('/',(req,res,next)=>{
    res.send('<h1>Hello From express</h1>');
 });
 
app.listen(3000, () => {
    console.log('server is running on port 3000');
});
