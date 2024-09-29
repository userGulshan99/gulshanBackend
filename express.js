
const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log('this is middlware 1');
    next();
})

app.use((req,res,next)=>{
    console.log('this is middlware 2');
   return res.end('<h1>Hello From Express.Js</h1>');
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');    
})