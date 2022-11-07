'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Areas', {
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
      name: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      hide: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Areas');
  }
};