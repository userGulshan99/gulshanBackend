
let http = require('http');
const responseHandler = require('./importMethods.js');

console.log(responseHandler.someMessage);

const server = http.createServer(responseHandler.Response);
server.listen(8080);