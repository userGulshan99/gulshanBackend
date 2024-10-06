
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),'data','product.json');

const getProductFromFile = cb =>{
    fs.readFile(p,'utf-8',(err,data)=>{
        if(err || !data){
            cb([]);
        }else{
            cb(JSON.parse(data));
        }
    })
}


module.exports = class Product{
    constructor(title){
        this.title = title;
    }

    save(){
        getProductFromFile((data)=>{
            data.push(this);
            fs.writeFile(p,JSON.stringify(data),(err)=>{
                return err;
            })
        })
    }

   static fetchAll(cb){
        getProductFromFile(cb);
    }
}
