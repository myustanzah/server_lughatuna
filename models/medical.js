'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medical.belongsTo(models.Students, { foreignKey: 'StudentId' })
    }
  }
  Medical.init({
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
    medicalCode: {
      type: DataTypes.INTEGER,
      field: 'medical_code'
    },
    name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING,
      field: 'postal_code'
    },
    insuranceProvider: {
      type: DataTypes.STRING,
      field: 'insurance_provider'
    },
    insuranceNumber: {
      type: DataTypes.STRING,
      field: 'insurance_number'
    },
    notes: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Medical',
  });
  return Medical;
};