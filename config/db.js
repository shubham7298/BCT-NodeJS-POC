const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;