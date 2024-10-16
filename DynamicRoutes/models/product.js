const db = require('../util/database');

module.exports = class Product {
 
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }


  // save the added or edited product in database
  save() {
    return db.execute('INSERT INTO products (title,imageUrl,description,price) VALUES (?,?,?,?)',[this.title,this.imageUrl,this.description,this.price]);
  }

  // get all products from database
  static fetchAll(cb) {
    return db.execute('SELECT * FROM products');
  }

  // find a product form database by id
  static findById(val){
   return db.execute(`SELECT * FROM products WHERE products.id = ?`,[val]);
  }

  // delete product by id from database
  static deleteById(id){
    return db.execute(`DELETE FROM products WHERE id =${id}`);
  }


};
