require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {UserGames, UserAchievements} = require('../models');
const cors = require('cors');
const {Op} = require("sequelize");
const ErrorMessage = require("../utils/ErrorMessage");
const GTAUtil = require("../utils/GTAUtil");

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

const pageLimit = 10;

const router = express.Router();

const gtaUtil = new GTAUtil();

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
			console.log(body.game_id)
			const game = await UserGames.create(body);
			const achievements = await createUserAchievements(body.user_id, game.game_id, game.id);
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
				star: game.star,
			}
		)
	}
	return gameList;
}

function calculateOffset(pageNumber) {
	return (pageNumber - 1) * pageLimit;
}

async function createUserAchievements(userId, gtaGameId, gameId) {
	console.log("before")
	const achievements = await getAchievements(userId, gtaGameId, gameId);
	for(let achievement of achievements) {
		await UserAchievements.create(achievement);
	}
	console.log("after")
}

async function getAchievements(userId, gtaGameId, gameId) {
	try {
		return await gtaUtil.requestGTAAchievement(gtaGameId).then(r => {
			if(r.code) {
				return r;
			} else {
				const result = [];
				for (let achievement of r) {
					result.push({
						user_id: userId,
						game_id: gameId,
						title: achievement.title,
						description: achievement.description,
						secret: achievement.secret,
						picture: achievement.img,
						value: achievement.value,
						earned: false
					});
				}
				return result;
			}
		});
	} catch (e) {
		return new ErrorMessage(400, "Hiba!", e.message);
	}
}
module.exports = router;