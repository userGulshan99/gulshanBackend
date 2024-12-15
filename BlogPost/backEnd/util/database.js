const Sequelize = require('sequelize');

// database setup
const sequelize = new Sequelize('blog', 'root', 'node@basics', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;