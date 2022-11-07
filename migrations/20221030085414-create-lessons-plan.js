'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LessonsPlans', {
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
      ObjectiveId: {
        type: Sequelize.INTEGER,
        field: 'objective_id',
        allowNull: false,
        references: {
          model: {
            tableName: 'Objectives'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      StudentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        allowNull: false,
        references: {
          model: {
            tableName: 'Students'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LessonsPlans');
  }
};