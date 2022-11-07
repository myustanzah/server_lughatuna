'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objective extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Objective.belongsTo(models.Areas, { foreignKey: 'AreaId' })
      Objective.belongsToMany(models.Students, { through: 'LessonsPlan' });
    }
  }
  Objective.init({
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
    name: {
      type: DataTypes.STRING
    },
    progresA: {
      type: DataTypes.BOOLEAN,
      field: 'progres_a'
    },
    progresB: {
      type: DataTypes.BOOLEAN,
      field: 'progres_b'
    },
    progresC: {
      type: DataTypes.BOOLEAN,
      field: 'progres_c'
    },
    hide: {
      type: DataTypes.BOOLEAN
    },
    AreaId: {
      type: DataTypes.INTEGER,
      field: 'area_id',
      references: {
        model: {
          tableName: 'Areas'
        },
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Objective',
  });
  return Objective;
};