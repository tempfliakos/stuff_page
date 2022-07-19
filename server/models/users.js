'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Users.init({
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Users',
		tableName:'users',
		timestamps: false,
		underscored: true,
	});
	return Users;
};