'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.belongsTo(models.User, { foreignKey: 'UserId' });
      Students.belongsToMany(models.Objective, { through: 'LessonsPlan' });
      Students.hasOne(models.Contact)
      Students.hasMany(models.Session)
      Students.hasMany(models.Observation)
      Students.hasOne(models.Medical)
      Students.hasOne(models.Allergy)
    }
  }
  Students.init({
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: true
    },
    nis: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    nisn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
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
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imgProfil: {
      type: DataTypes.STRING,
      field: 'img_profil',
      allowNull: true
    },
    hide: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};