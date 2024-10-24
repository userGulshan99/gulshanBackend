const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Users = sequelize.define('users',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true    
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phonenumber : {
        type : Sequelize.INTEGER,
    },
    email : {
        type : Sequelize.STRING
    }
})

module.exports = Users;