'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.TodoType, {
        foreignKey: 'type_id'
      });
    }
  }
  Todo.init({
    user_id: {
      type:DataTypes.BIGINT,
    },
    type_id: {
      type:DataTypes.BIGINT,
    },
    name: DataTypes.STRING,
    done: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
    tableName:'todo',
    underscored: true,
  });
  return Todo;
};