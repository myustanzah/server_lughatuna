'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.Students, { foreignKey: 'StudentId' })
    }
  }
  Contact.init({
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
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    relationship: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    homePhone: {
      type: DataTypes.STRING,
      field: 'home_phone'
    },
    mobilePhone: {
      type: DataTypes.STRING,
      field: 'mobile_phone'
    },
    email: {
      type: DataTypes.STRING
    },
    homeAddress: {
      type: DataTypes.STRING,
      field: 'home_address'
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
    workAddress: {
      type: DataTypes.STRING,
      field: 'worl_address'
    },
    cityWork: {
      type: DataTypes.STRING,
      field: 'city_work'
    },
    stateWork: {
      type: DataTypes.STRING,
      field: 'state_work'
    },
    postalCodeWork: {
      type: DataTypes.STRING,
      field: 'postal_code_work'
    },
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};