'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Observation, { foreignKey: 'ObservationId' })
    }
  }
  Comment.init({
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
    ObservationId: {
      type: DataTypes.INTEGER,
      field: 'observation_id',
      references: {
        model: {
          tableName: 'Observations'
        },
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    description: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};