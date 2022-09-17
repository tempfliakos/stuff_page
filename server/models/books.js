'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
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
  Books.init({
    book_id: DataTypes.STRING,
    user_id: DataTypes.BIGINT,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    page: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
    timestamps: false,
    underscored: true,
  });
  return Books;
};