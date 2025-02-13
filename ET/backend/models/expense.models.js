const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database.js');


const Expense = sequelize.define('expense',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    amount:{
        type : DataTypes.FLOAT
    },

    category :{
        type : DataTypes.STRING
    },
    description : {
        type : DataTypes.STRING
    }
}
)

module.exports = {Expense};