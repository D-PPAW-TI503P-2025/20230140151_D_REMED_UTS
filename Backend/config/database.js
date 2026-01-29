const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library', 'root', 'Oranggabut712', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3309,  // Sesuaikan jika port MySQL Anda berbeda (default 3306)
});

module.exports = sequelize;