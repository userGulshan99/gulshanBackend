const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database');

const Book = sequelize.define('book',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true    
    },
    bookname : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
})

module.exports = Book;