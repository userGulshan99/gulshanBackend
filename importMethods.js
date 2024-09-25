
const fs = require('fs');

const responseHandler=function(req,res){

    if(req.url =='/'){

                let formMessage;
                return fs.readFile('./formValues.txt','utf-8',(err,data)=>{
                    if(err)console.log('File Not Found');
                    formMessage = data;
                    
                    if(formMessage){
                        formMessage=formMessage.split('=')[1];
                    }
                    res.write(`<html lang="en"><head><title>Welcome</title></head><body><h2>${formMessage}</h2><form action="/message" method="post"><input type="text" placeholder="write the message here" name="message"><button type="submit">Send</button></form></body></html>`);
                    return res.end();
                });            

    }

    if(req.url =='/message' && req.method =='POST'){
            const body = [];
            
            req.on('data',(chunk)=>{
                body.push(chunk);
            });
            
        return req.on('end',()=>{
                let formData = Buffer.concat(body).toString();
                
                fs.writeFile('formValues.txt',formData,(err)=>{
                    if(err){
                        console.log('error: ',err);
                        return res.end();                    
                    }
                    
                    res.statusCode = 302;
                    res.setHeader('location','/');
                    return res.end();         
                });      
        });
    }

    res.statusCode = 404;
    res.write('Not Found');
    res.end();

}


// module.exports = responseHandler;

// module.exports = {
//     Response:responseHandler,
//     someMessage:'Welcome User!'
// }

module.exports.Response = responseHandler;
module.exports.someMessage = 'Welcome User!';