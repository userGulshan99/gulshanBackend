const {DataTypes, Model} = require('sequelize');

const sequelize = require('../utils/database');

const ReturnBook = sequelize.define('returnbook', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true    
    },
    bookname :{
        type : DataTypes.STRING,
    },
    fine: {
        type : DataTypes.DECIMAL,
    }
})

module.exports = ReturnBook;