'use strict';
const {
  Model
} = require('sequelize');
const { encryptPass, decryptPass } = require('../helper/crypto')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Students, { foreignKey: 'UserId' });
      User.hasMany(models.Areas);
      User.hasMany(models.Observation)
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Please input your email or password',
        },
        isEmail: {
          msg: 'Your email incorrect'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kodeUser: {
      type: DataTypes.INTEGER,
      field: 'kode_user',
      allowNull: false
    },
    imgProfil: {
      type: DataTypes.STRING,
      field: 'img_profil',
      allowNull: false
    },
    descriptions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instence, options) =>{
    const enPass = encryptPass(instence.password, 8)
    instence.password = enPass
  })
  return User;
};