const DataType = require('sequelize');

const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
    id : {
        type : DataType.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    comment: {
        type : DataType.STRING
    }
});

module.exports = Comment;