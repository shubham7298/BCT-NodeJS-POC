const Sequelize = require('sequelize');

const sequelize = require('../config/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    default: 'New user!'
  },
  password: Sequelize.STRING
});

module.exports = User;
