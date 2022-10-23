require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {UserAchievements} = require('../models');
const cors = require('cors');

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}
const router = express.Router();

router
	.get("/:game", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const gameId = req.params.game.split('=')[1];
			const userId = req.user.id;
			const achievements = await UserAchievements.findAll({
				where: {
					game_id: gameId,
					user_id: userId,
				}
			});
			res.status(200).send(achievements);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.put("/:achievement", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const achievementId = req.params.achievement;
			const data = req.body;
			const achievement = await UserAchievements.findByPk(achievementId);
			await achievement.update(data);
			res.status(200).send(data);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	});

module.exports = router;