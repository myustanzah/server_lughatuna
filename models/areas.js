'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Areas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Areas.belongsTo(models.User, { foreignKey: 'UserId'})
      Areas.hasMany(models.Objective)
    }
  }
  Areas.init({
    
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
    name: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    hide: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Areas',
  });
  return Areas;
};