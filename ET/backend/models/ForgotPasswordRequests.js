const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database.js');

const forgotPasswordRequests = sequelize.define('forgotPasswordRequest', {
    id:{
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },

    isactive : {
        type : DataTypes.BOOLEAN
    }
});



module.exports = {
    forgotPasswordRequests
};