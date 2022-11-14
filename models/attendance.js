'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Session, { foreignKey: 'SessionId' })
    }
  }
  Attendance.init({
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
    SessionId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.BOOLEAN
    },
    absent: {
      type: DataTypes.BOOLEAN
    },
    tardy: {
      type: DataTypes.BOOLEAN
    },
    comment: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};