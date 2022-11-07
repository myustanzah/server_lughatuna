'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
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
        field: 'updated_at',
        type: Sequelize.DATE
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: true
      },
      nis: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      nisn: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imgProfil: {
        type: Sequelize.STRING,
        field: 'img_profil',
        allowNull: true
      },
      hide: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};