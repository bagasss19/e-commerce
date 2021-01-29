'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
      Product.hasMany(models.Wishlist)
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "name cannot be empty!"
        },
        notNull : {
          args : true,
          msg : "name cannot be empty!"
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "image url cannot be empty!"
        },
        notEmpty : {
          args : true,
          msg : "image url cannot be empty!"
        },
        isUrl : {
          args : true,
          msg : "please input url type!"
        }
      }
    },
    price: {      
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "price cannot be empty!"
        },
        min : {
          args : [0],
          msg : "please input number above 0!"
        },
        isNumeric : {
          args : true,
          msg : "please input number format!"
        },
        notNull : {
          args : true,
          msg : "price cannot be empty!"
        }
      }},
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "stock cannot be empty!"
        },
        notNull : {
          args : true,
          msg : "stock cannot be empty!"
        },
        min : {
          args : [0],
          msg : "please input number above 0!"
        },

        isNumeric : {
          args : true,
          msg : "please input number format!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};