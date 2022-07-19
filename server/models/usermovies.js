'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users);
      this.belongsTo(models.Movies);
    }
  };
  UserMovies.init({
    user_id: DataTypes.BIGINT,
    movie_id: {
      type:DataTypes.BIGINT,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    owned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    liza: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserMovies',
    tableName:'user_movie',
    timestamps: false,
    underscored: true,
  });
  return UserMovies;
};