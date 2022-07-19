require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const { Op } = require("sequelize");
const { Movies, UserMovies, UserGames, UserAchievements } = require('../models');

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}


const router = express.Router();

router
	.get("/movie/seen", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};

			const movies = await UserMovies.findAll({
				attributes: ['id', 'seen', 'owned'],
				where: { user_id: userId },
			});

			result['seen'] = movies.filter(m => m.seen).length;
			result['notSeen'] = movies.filter(m => !m.seen && m.owned).length;
			result['notBought'] = movies.filter(m => !m.owned).length;

			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/movie/liza", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};

			const movies = await UserMovies.findAll({
				attributes: ['id', 'liza'],
				where: { user_id: userId },
			});

			result['liza'] = movies.filter(m => m.liza).length;
			result['notLiza'] = movies.filter(m => !m.liza).length;

			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/movie/release", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};
			const temp = {};
			const movies = await UserMovies.findAll({
				attributes: ['id'],
				where: { user_id: userId },
				include: [
					{
						model: Movies,
						attributes: ['release_date'],
					}]
			});
			let years = [];
			let movieCount = [];
			for (let movie of movies) {
				const year = new Date(movie.Movie.release_date).getFullYear();
				temp[year] = temp[year] ? temp[year] + 1 : 1;
			}
			Object.keys(temp).forEach(function (key) {
				years.push(key);
				movieCount.push(temp[key]);
			})
			result['years'] = years;
			result['movieCount'] = movieCount;
			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/game/done", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};
			let games = await UserGames.findAll({
				attributes: ['game_id', 'console'],
				where: {
					user_id: userId,
					console: {
						[Op.or]: ['Xbox', 'Playstation'],
					},
					wish: false,
				},
			});
			games = await generateGamesList(games, userId);
			const xboxGames = games.filter(g => g.console === 'Xbox');
			const psGames = games.filter(g => g.console === 'Playstation');
			result['finished'] = xboxGames.filter(g => g.done).length + psGames.filter(g => g.done).length;
			result['notFinished'] = games.length - result['finished'];

			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/game/console", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};
			let games = await UserGames.findAll({
				attributes: ['game_id', 'console'],
				where: {
					user_id: userId,
					wish: false,
				},
			});
			result['xbox'] = games.filter(g => g.console === 'Xbox').length;
			result['playstation'] = games.filter(g => g.console === 'Playstation').length;
			result['switch'] = games.filter(g => g.console === 'Switch').length;

			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/game/achievement", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			let games = await UserGames.findAll({
				attributes: ['game_id', 'console'],
				where: {
					user_id: userId,
					console: {
						[Op.or]: ['Xbox', 'Playstation'],
					},
					wish: false,
				},
			});
			games = await generateGamesList(games, userId);
			let xboxData = {
				earned: 0,
				notEarned: 0
			};
			let psData = {
				earned: 0,
				notEarned: 0
			};

			for (let game of games) {
				if (game.console === 'Xbox') {
					xboxData.earned += game.earned;
					xboxData.notEarned += game.notEarned;
				} else {
					psData.earned += game.earned;
					psData.notEarned += game.notEarned;
				}
			}
			const result = {
				'xbox': xboxData,
				'playstation': psData
			};
			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/game/wishlist", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const userId = req.user.id;
			const result = {};
			let games = await UserGames.findAll({
				attributes: ['game_id', 'console'],
				where: {
					user_id: userId,
					wish: true,
				},
			});
			result['xbox'] = games.filter(g => g.console === 'Xbox').length;
			result['playstation'] = games.filter(g => g.console === 'Playstation').length;
			result['switch'] = games.filter(g => g.console === 'Switch').length;

			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})

async function generateGamesList(games, userId) {
	const gameDTOs = games.map((e) => {
		return {
			game_id: e['game_id'],
			console: e['console']
		}
	});
	let gameList = await convertGameAchievement(gameDTOs, userId);
	return gameList;
}

async function convertGameAchievement(gameDTOs, userId) {
	const achievements = await UserAchievements.findAll({
		attributes: ['game_id', 'earned'],
		where: {
			game_id: {
				[Op.in]: gameDTOs.map((e) => { return e['game_id'] })
			},
			user_id: userId,
		}
	});

	let result = [];
	for (let gameDTO of gameDTOs) {
		const earned = achievements.filter(a => a.game_id === gameDTO.game_id && a.earned).length;
		const notEarned = achievements.filter(a => a.game_id === gameDTO.game_id && !a.earned).length;
		result.push({
			"game_id": gameDTO.game_id,
			"console": gameDTO.console,
			"earned": earned,
			"notEarned": notEarned,
			"done": isCompleted(earned, notEarned),
		});
	}
	return result;
}

function isCompleted(notEarned) {
	return !notEarned || notEarned === 0;
}

module.exports = router;