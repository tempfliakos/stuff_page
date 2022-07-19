'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserGames extends Model {
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
	UserGames.init({
		user_id: DataTypes.BIGINT,
		game_id: DataTypes.BIGINT,
		console: DataTypes.STRING,
		title: DataTypes.STRING,
		picture: DataTypes.STRING,
		wish: DataTypes.BOOLEAN,
		star: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'UserGames',
		tableName: 'user_game',
		timestamps: false,
		underscored: true,
	});
	return UserGames;
};