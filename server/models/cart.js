'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args:[0],
          msg:"Minimum stock is 0!"
         }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
    hooks : {
      beforeCreate: (cart, options) => {
        cart.status = false
        cart.quantity = 1
      }
    }
  });
  return Cart;
};