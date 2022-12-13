'use strict';

const { encryptPass } = require('../helper/crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Users', 
      [
        {
         id: 100,
         created_at: new Date(),
         updated_at: new Date(),
         name: 'Super Admin',
         email: 'superadmin@mail.com',
         password: encryptPass('123123', 8),
         kode_user: 1,
         suspend: false
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
