const Sequelize = require('sequelize');

const sequelize = new Sequelize('books','root','node@basics',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;