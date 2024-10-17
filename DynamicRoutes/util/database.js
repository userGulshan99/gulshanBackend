const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-basics','root','node@basics',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;