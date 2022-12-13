'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicals', {
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
      medicalCode: {
        type: Sequelize.INTEGER,
        field: 'medical_code',
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
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
      insuranceProvider: {
        type: Sequelize.STRING,
        field: 'insurance_provider'
      },
      insuranceNumber: {
        type: Sequelize.STRING,
        field: 'insurance_number'
      },
      notes: {
        type: Sequelize.STRING
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medicals');
  }
};