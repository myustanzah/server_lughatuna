'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Students, { foreignKey: 'StudentId' })
    }
  }
  Session.init({
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    sesi: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    StudentId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.BOOLEAN
    },
    tuesday: {
      type: DataTypes.BOOLEAN
    },
    wednesday: {
      type: DataTypes.BOOLEAN
    },
    thursday: {
      type: DataTypes.BOOLEAN
    },
    friday: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};