const DataType = require('sequelize');

const sequelize = require('../util/database');

// expense table define

const Expenses = sequelize.define('expense',{
    id : {
        type : DataType.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },

    expenseamount : {
        type : DataType.DOUBLE,
        allowNull : false,
    },

    category : {
        type : DataType.STRING,
        allowNull : false
    },
    
    description : {
        type : DataType.STRING,
    }
});

module.exports = Expenses;