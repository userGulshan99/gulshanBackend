// cart model to read and write File

const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

const getProductsFromCartFile = cb => {
    fs.readFile(p,'utf-8',(err, fileContent) => {
      if (err || !fileContent) {
        cb(undefined);
      } else {
        cb(JSON.parse(fileContent));
      }
      
    });
  };
  

module.exports = class Cart{
  
  // method to see cart items
    static get(callback){
        getProductsFromCartFile((data)=>{
          callback(data);
        });
    }

    // method to add new product in cart
    static addToCart(product){
          product = {
            id:product.id,
            title:product.title,
            price:product.price,
            imageUrl:product.imageUrl
          }

          // getting stored cart items and adding new item

          getProductsFromCartFile((data)=>{


            let cart = {products:[],price:0};
            
            if(data == undefined){
              product.qty = 1;
              cart.products.push(product);

            }else{ 
              let existingDataIndex = data.products.findIndex((a)=>a.id == product.id);
              
              if(existingDataIndex != -1){
                data.products[existingDataIndex].qty += 1;
              }else{
                product.qty = 1;
                data.products.push(product)
              }
              cart = data;
            }
            let price = 0;
            cart.products.map((a)=>{
              price+= Number(a.price) * Number(a.qty);
            })            
            cart.price = price; 
            fs.writeFile(p,JSON.stringify(cart),(err)=>{return});
            
          }) 
          
        }

    // delete cart item
    static deleteItem(id){
      getProductsFromCartFile((data)=>{
        let prod = data.products;
        prod = prod.filter((p)=>p.id != id);
          let price = 0;
            prod.map((a)=>{
              price+= Number(a.price) * Number(a.qty);
            })

            data.products = prod;
            data.price = price;
            fs.writeFile(p,JSON.stringify(data),(err)=>{return});
      });
    }
}