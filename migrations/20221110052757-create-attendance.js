'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
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
      SessionId: {
        type: Sequelize.INTEGER,
        field: 'session_id',
        references: {
          model: {
            tableName: 'Sessions'
          },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      present: {
        type: Sequelize.BOOLEAN
      },
      absent: {
        type: Sequelize.BOOLEAN
      },
      tardy: {
        type: Sequelize.BOOLEAN
      },
      comment: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Attendances');
  }
};