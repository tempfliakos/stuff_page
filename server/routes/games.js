require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {UserGames, UserAchievements} = require('../models');
const axios = require('axios');
const cors = require('cors');
const {Op} = require("sequelize");

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

const pageLimit = 10;

const router = express.Router();

router
	.get("/:console&:page&:title", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const consoleParam = req.params.console.split('=')[1];
			const userId = req.user.id;
			const offset = calculateOffset(req.params.page.split('=')[1]);
			let title = '';
			if (req.params.title.split('=')[1]) {
				title = req.params.title.split('=')[1];
			}
			const games = await UserGames.findAndCountAll({
				where: {
					user_id: userId,
					console: consoleParam,
					wish: false,
					title: {
						[Op.iLike]: '%' + title.toLowerCase() + '%',
					}
				},
				limit: pageLimit,
				offset: offset,
				subQuery: false,
				order: [['title', 'ASC']]
			});
			const convertedGames = await generateGamesList(games.rows, userId);
			const result = {
				"games": convertedGames,
				"count": games.count
			}
			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})
	.get("/ids/:console", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const userId = req.user.id;
			const consoleParam = req.params.console.split('=')[1];
			const games = await UserGames.findAll({
				attributes: ['game_id'],
				where: {
					user_id: userId,
					console: consoleParam,
					wish: false
				}
			});
			res.status(200).send(games);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.post("/", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const body = req.body;
			body.user_id = req.user.id;
			if (!body.picture.startsWith('http')) {
				body.picture = 'https:' + body.picture;
			}
			if (!body.wish) {
				body.wish = false;
			}
			body.star = false;

			const game = await UserGames.create(body);
			if (body.console === "Xbox") {
				await xbox_achievement(body);
			} else {
				//await playstation_trophies(body);
			}
			res.status(200).send(await convertGame(game, body.user_id));
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.put("/:game", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const data = req.body;
			const userGame = await UserGames.findOne({
				where: {
					user_id: id,
					game_id: data.game_id,
				}
			});
			await userGame.update(data, {where: {id: userGame.id}});
			res.status(200).send(data);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})

	.get("/wishlist", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const games = await UserGames.findAll({
				where: {
					user_id: userId,
					wish: true,
				},
			});
			res.status(200).send(await generateGamesList(games, userId));
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/wishlist/ids", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const userId = req.user.id;
			const games = await UserGames.findAll({
				attributes: ['game_id'],
				where: {
					user_id: userId,
					wish: true,
				}
			});
			res.status(200).send(games);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/star/:console", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const consoleParam = req.params.console.split('=')[1];
			const games = await UserGames.findAll({
				where: {
					user_id: userId,
					console: consoleParam,
					star: true,
				},
			});
			res.status(200).send(await generateStarGamesList(games));
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.delete("/wishlist/:game", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userGame = await UserGames.findByPk(req.params.game);
			await userGame.destroy();
			res.status(202).send(userGame);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	});

async function xbox_achievement(body) {
	const header = {
		'Access-Control-Allow-Origin': '*',
		'X-Auth': 'bb5b17184989b2e029c329c78a906a1e80e322f3',
		'Content-Type': 'application/json; charset=utf-8'
	};
	const achivement_url = process.env.XBOX_API_ACHIEVEMENTS + body.game_id;
	axios.get(achivement_url, {
		url: achivement_url,
		headers: header
	}).then(res => {
			let achievementPicture;
			let gamerscore;
			for (let data of res.data) {
				if (data.imageUnlocked) {
					achievementPicture = data.imageUnlocked;
					gamerscore = data.gamerscore;
				} else {
					achievementPicture = data.mediaAssets[0].url;
					gamerscore = data.rewards[0].value;
				}
				UserAchievements.create({
					user_id: body.user_id,
					game_id: body.game_id,
					title: data.name,
					description: data.description,
					secret: data.isSecret,
					picture: achievementPicture,
					value: gamerscore,
				});
			}
		}
	).catch(err => console.error(err));
}

async function generateGamesList(games, userId) {
	let gameList = [];
	for (let game of games) {
		gameList.push(await convertGame(game, userId));
	}
	return gameList;
}

async function convertGame(game, userId) {
	const achievements = await UserAchievements.findAll({
		where: {
			game_id: game.game_id,
			user_id: userId,
		}
	});
	const result = {
		id: game.id,
		game_id: game.game_id,
		picture: game.picture,
		console: game.console,
		title: game.title,
		wish: game.wish,
		star: game.star,
		earned: achievements.filter(a => a.earned).length,
		sum: achievements.length,
		highlight: false,
	}

	if (game.console === "Playstation") {
		result.bronze = calculateByValue(achievements, "Bronze");
		result.silver = calculateByValue(achievements, "Silver");
		result.gold = calculateByValue(achievements, "Gold");
		result.platinum = calculateByValue(achievements, "Platinum");
	}
	return result;
}

function calculateByValue(achievements, value) {
	const filteredAchievements = achievements.filter(a => a.value === value);
	return {
		earned: filteredAchievements.filter(fa => fa.earned).length,
		sum: filteredAchievements.length
	}
}

async function generateStarGamesList(games) {
	let gameList = [];
	for (let game of games) {
		gameList.push(
			{
				id: game.id,
				game_id: game.game_id,
				picture: game.picture,
				console: game.console,
				title: game.title,
				highlight: true,
			}
		)
	}
	return gameList;
}

function calculateOffset(pageNumber) {
	return (pageNumber - 1) * pageLimit;
}

module.exports = router;