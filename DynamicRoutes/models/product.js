const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => { 
  fs.readFile(p, (err, fileContent) => {
    if (err ) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
    
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id == undefined){
        this.id = ((products.length || 0) + 1).toString();
      }
      products.push(this);
      products.sort((a,b)=>Number(a.id) - Number(b.id));
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
   return getProductsFromFile((products)=>{
     const product = products.find((ele)=> ele.id == id);      
      cb(product);
    })
  }
 
  static deleteById(id){
    getProductsFromFile((products)=>{
      products = products.filter((prod)=>prod.id != id);
      
      fs.writeFile(p, JSON.stringify(products), err => {return});
    })
  }


};
