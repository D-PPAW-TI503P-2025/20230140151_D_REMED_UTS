const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');

const BorrowLog = sequelize.define('BorrowLog', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  latitude: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    validate: { min: -90, max: 90 }  // Validasi dasar untuk latitude
  },
  longitude: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    validate: { min: -180, max: 180 }  // Validasi dasar untuk longitude
  },
});

BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = BorrowLog;