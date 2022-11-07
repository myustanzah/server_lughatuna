'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      sesi: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      StudentId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Students'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      monday: {
        type: Sequelize.BOOLEAN
      },
      tuesday: {
        type: Sequelize.BOOLEAN
      },
      wednesday: {
        type: Sequelize.BOOLEAN
      },
      thursday: {
        type: Sequelize.BOOLEAN
      },
      friday: {
        type: Sequelize.BOOLEAN
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};