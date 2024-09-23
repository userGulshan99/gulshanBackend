
let http = require('http');

const server = http.createServer((request,response)=>{

                if(request.url == '/home'){
                    response.setHeader('Content-Type','text/html');
                    response.write('<html>');
                    response.write('<head><title>Home</title></head>');
                    response.write('<body><h1>Welcome Home</h1></body>');
                    response.write('</html>');
                return response.end();
                }

                if(request.url == '/about'){
                    response.setHeader('Content-Type','text/html');
                    response.write('<html>');
                    response.write('<head><title>About</title></head>');
                    response.write('<body><h1>Welcome to About Us page</h1></body>');
                    response.write('</html>');
                return response.end();
                }
                
                if(request.url == '/node'){
                    response.setHeader('Content-Type','text/html');
                    response.write('<html>');
                    response.write('<head><title>NodeJS</title></head>');
                    response.write('<body><h1>Welcome to my Node Js project</h1></body>');
                    response.write('</html>');
                return response.end();
                }

                response.setHeader('Content-Type','text/html');
                response.write('<html>');
                response.write('<head><title>Welcome</title></head>');
                response.write('<body><h1>Welcome User</h1></body>');
                response.write('</html>');
                response.end();

                });

server.listen(8080);