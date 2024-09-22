
let http = require('http');
http.createServer((request,response)=>{
    response.write('<h1>Gulshan Bankar</h1>');
    response.end();
}).listen(4000);