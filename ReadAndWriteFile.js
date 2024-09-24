
const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    
    if(req.url =='/'){
        res.write('<html lang="en"><head><title>Welcome</title></head><body><h1>Welcome User!</h1><form action="/message" method="post"><input type="text" placeholder="write your name" name="name"><input type="number" name="age" placeholder="write your age"><button type="submit">Submit</button></form></body></html>');
        return res.end();
    }

    if(req.url =='/message' && req.method =='POST'){
        const body = [];
        
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        
       return req.on('end',()=>{
            let formData = Buffer.concat(body).toString();
            fs.writeFile('formValues.txt',formData,(err)=>{
                res.statusCode = 302;
                res.setHeader('location','/');
                return res.end();
            });
        });
    }

}).listen(8080);