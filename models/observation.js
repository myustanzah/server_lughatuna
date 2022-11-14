'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Observation.belongsTo(models.User, { foreignKey: 'UserId' });
      Observation.belongsTo(models.Students, { foreignKey: 'StudentId' });
      Observation.hasMany(models.Comment)
      
    }
  }
  Observation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    UserId: {
      type: DataTypes.INTEGER,
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
    fileUrl: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Observation',
  });
  return Observation;
};