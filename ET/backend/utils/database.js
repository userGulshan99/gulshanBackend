const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker','root','node@basics',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
