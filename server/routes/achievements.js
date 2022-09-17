require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {UserAchievements} = require('../models');
const cors = require('cors');
const axios = require("axios");

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
	})
	.post("/:game", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const gameId = req.params.game.split('=')[1];
			const userId = req.user.id;
			const body = {
				user_id: userId,
				game_id: gameId
			}
			res.status(200).send(await update_xbox_achievement(body));
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	});

async function update_xbox_achievement(body) {
	const header = {
		'Access-Control-Allow-Origin': '*',
		'Authorization': `Bearer ${process.env.XBOX_API_XAPI_ID}`,
		'Content-Type': 'application/json; charset=utf-8'
	};
	const achievement_url = `${process.env.XBOX_API_XAPI_HOST}${process.env.XBOX_API_XBOXUSER_ID}/achievements/${body.game_id}`;
	const achievements = await UserAchievements.findAll({
		where: {
			game_id: body.game_id,
			user_id: body.user_id,
		}
	});
	axios.get(achievement_url, {
		url: achievement_url,
		headers: header
	}).then(res => {
			let achievementPicture;
			let gamerscore;
			let result = [];
			for (let data of res.data.achievements) {
				let isNotExist = achievements.filter(a => a.title === data.name).length === 0;
				if (isNotExist) {
					if (data.imageUnlocked) {
						achievementPicture = data.imageUnlocked;
						gamerscore = data.gamerscore;
					} else {
						achievementPicture = data.mediaAssets[0].url;
						gamerscore = data.rewards[0].value;
					}
					let achievement = {
						user_id: body.user_id,
						game_id: body.game_id,
						title: data.name,
						description: data.description,
						secret: data.isSecret,
						picture: achievementPicture,
						value: gamerscore,
					}
					UserAchievements.create(achievement);
					result.push(achievement);
				}
			}
			return result;
		}
	).catch(err => console.error(err));
}

module.exports = router;