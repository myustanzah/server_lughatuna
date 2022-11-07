'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      },
      StudentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        references: {
          model: {
            tableName: 'Students'
          },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
      },
      relationship: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      homePhone: {
        type: Sequelize.STRING,
        field: 'home_phone'
      },
      mobilePhone: {
        type: Sequelize.STRING,
        field: 'mobile_phone'
      },
      email: {
        type: Sequelize.STRING
      },
      homeAddress: {
        type: Sequelize.STRING,
        field: 'home_address'
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING,
        field: 'postal_code'
      },
      workAddress: {
        type: Sequelize.STRING,
        field: 'worl_address'
      },
      cityWork: {
        type: Sequelize.STRING,
        field: 'city_work'
      },
      stateWork: {
        type: Sequelize.STRING,
        field: 'state_work'
      },
      postalCodeWork: {
        type: Sequelize.STRING,
        field: 'postal_code_work'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contacts');
  }
};