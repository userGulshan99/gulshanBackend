const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker', process.env.DB_USERNAME, process.env.DB_PASSWORD , {
    dialect : 'mysql'
});

module.exports = sequelize;