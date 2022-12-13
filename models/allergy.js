'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allergy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allergy.belongsTo(models.Students, { foreignKey: 'StudentId' })
    }
  }
  Allergy.init({
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
    StudentId: {
      type: DataTypes.INTEGER,
      field: 'student_id',
      references: {
        model: {
          tableName: 'Students'
        },
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    name: {
      type: DataTypes.STRING
    },
    anaphylactic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notes: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Allergy',
  });
  return Allergy;
};