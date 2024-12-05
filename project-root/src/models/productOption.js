const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text'
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ProductOption;
