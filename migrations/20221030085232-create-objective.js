'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Objectives', {
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
      progresA: {
        type: Sequelize.BOOLEAN,
        field: 'progres_a'
      },
      progresB: {
        type: Sequelize.BOOLEAN,
        field: 'progres_b'
      },
      progresC: {
        type: Sequelize.BOOLEAN,
        field: 'progres_c'
      },
      hide: {
        type: Sequelize.BOOLEAN
      },
      AreaId: {
        type: Sequelize.INTEGER,
        field: 'area_id',
        references: {
          model: {
            tableName: 'Areas'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Objectives');
  }
};