const {DataTypes} = require('sequelize');

const sequelize = require('../utils/database.js');

const listOfDownloadedExpenses = sequelize.define('downloadedexpenseslist',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    url :{
        type : DataTypes.STRING
    }
}
)


module.exports = {listOfDownloadedExpenses};