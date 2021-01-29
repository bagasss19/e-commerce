'use strict';

const { hashPassword } = require('../helper/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        email : "bagas@email.com",
        password : hashPassword("bagas123"),
        role : "customer",
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
