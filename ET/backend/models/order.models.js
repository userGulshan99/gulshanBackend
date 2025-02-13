const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database.js');

const Order = sequelize.define('order',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    paymentid:{
        type : DataTypes.STRING
    },

    orderid :{
        type : DataTypes.STRING
    },

    status : {
        type : DataTypes.STRING
    }
}
)


module.exports = {Order};