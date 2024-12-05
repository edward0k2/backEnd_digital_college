const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');
const Category = require('./category');

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = ProductCategory;
