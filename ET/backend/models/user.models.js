const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database.js');

const User = sequelize.define('user',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        allowNull : false,
        type : DataTypes.STRING
    },
    ispremiumuser : {
        type : DataTypes.BOOLEAN
    },
    totalexpenseamount : {
        type : DataTypes.BIGINT,
        defaultValue : 0
    }
}
)


module.exports = {User};