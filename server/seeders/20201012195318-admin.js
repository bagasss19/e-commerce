'use strict';

const { hashPassword } = require('../helper/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        email : "admin@email.com",
        password : hashPassword("admin123"),
        role : "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
