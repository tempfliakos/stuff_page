'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users);
    }
  };
  UserAchievements.init({
    user_id: DataTypes.BIGINT,
    game_id: DataTypes.BIGINT,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    secret: DataTypes.BOOLEAN,
    picture: DataTypes.STRING,
    value: DataTypes.STRING,
    earned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserAchievements',
    tableName:'user_achievement',
    timestamps: false,
    underscored: true,
  });
  return UserAchievements;
};