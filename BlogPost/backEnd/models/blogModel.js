const DataType = require('sequelize');

const sequelize = require('../util/database');

const Blog = sequelize.define('blog', {
    id : {
        type : DataType.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    title: {
        type : DataType.STRING
    },
    author : {
        type : DataType.STRING
    },
    content : {
        type : DataType.TEXT
    }
});

module.exports = Blog;