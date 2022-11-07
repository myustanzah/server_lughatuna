'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonsPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  LessonsPlan.init({
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    ObjectiveId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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
  }, {
    sequelize,
    modelName: 'LessonsPlan',
  });
  return LessonsPlan;
};