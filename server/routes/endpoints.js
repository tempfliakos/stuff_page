require('dotenv').config();
const express = require('express');
const axios = require("axios");
const ErrorMessage = require("../utils/ErrorMessage");
const GTAUtil = require("../utils/GTAUtil");

const router = express.Router();

let IGDBToken = 't4zqj4xp60ehhjtj62rpcrb6knyzx1';

const gtaUtil = new GTAUtil();

router
	.get("/movies/:query", async (req, res) => {
		try {
			const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const link = `${process.env.TMDB_LINK}&query=${query}`;
			const movies = await sendToEndpoint(link, res);
			res.status(200).send(movies.results);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/books/:query", async (req, res) => {
		try {
			const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const link = `https://moly.hu/api/books.json?q=${query}&key=8bfdee319371c7aa2035477d1f678c58`;
			const books = await sendToEndpoint(link, res);
			const result = [];
			for (let book of books.books) {
				const tempBook = await sendToEndpoint(`https://moly.hu/api/book/${book.id}.json?key=8bfdee319371c7aa2035477d1f678c58`, res);
				result.push({
					"book_id": tempBook['book'].id.toString(),
					"author": tempBook['book'].authors ? tempBook['book'].authors.map(author => author.name).join() : null,
					"title": tempBook['book'].title,
					"description": tempBook['book'].description,
					"picture": tempBook['book'].cover
				});
			}
			res.status(200).send(result);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/xbox/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		const result = await getGTAGame("Xbox", query);
		if(result.code) {
			res.status(result.code).send(result);
		} else {
			res.status(200).send(result);
		}
	})
	.get("/playstation/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		const result = await getGTAGame("Playstation", query);
		if(result.code) {
			res.status(result.code).send(result);
		} else {
			res.status(200).send(result);
		}
	})
	.get("/switch/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		const result = await getIGDBGame("Switch", query, res);
		if(result.code) {
			res.status(result.code).send(result);
		} else {
			res.status(200).send(result);
		}
	})
	.get("/wish/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		const  result = await getIGDBGame(null, query, res);
		if(result.code) {
			res.status(result.code).send(result);
		} else {
			res.status(200).send(result);
		}
	});


async function sendToEndpoint(link, res) {
	const headers = {
		"Content-Type": "application/json;charset=utf-8",
	};
	return await axios(link, {
		headers,
	}).then(response => {
		return response.data;
	});
}

async function getIGDBGame(console, query) {
	try {
		return await sendToIGDB(query, true).then(r => {
			const result = [];
			for (let game of r.data) {
				result.push({
					game_id: game.id,
					title: game.name,
					picture: game.cover ? game.cover.url.replace("t_thumb", "t_cover_big") : null,
					console: console,
					wish: console == null
				})
			}
			return result;
		});
	} catch (e) {
		return new ErrorMessage(400, "Hiba!", e.message);
	}
}

async function sendToIGDB(title, isRefreshable) {
	const headers = {
		"Content-Type": "text/plain;charset=utf-8",
		"Client-ID": `${process.env.IGDB_CLIENT}`,
		"Authorization": `Bearer ${IGDBToken}`,
	};
	return await axios('https://api.igdb.com/v4/games', {
		headers,
		method: "POST",
		data: `search "${title}"; fields cover.url,name; limit 100;`,
	}).catch(async e => {
		if (isRefreshable) {
			IGDBToken = await getIGDBNewToken();
			return await sendToIGDB(title, false);
		}
		return new ErrorMessage(400, "Hiba!", e.message);
	});
}

async function getIGDBNewToken() {
	const client_id = process.env.IGDB_CLIENT;
	const client_secret = process.env.IGDB_SECRET;
	const grant_type = 'client_credentials';

	return await axios.post('https://id.twitch.tv/oauth2/token', null, {
		params: {
			client_id,
			client_secret,
			grant_type
		}
	}).then(response => {
		return response.data['access_token'];
	}).catch(e => {
		return new ErrorMessage(400, "Hiba!", e.message);
	});
}

async function getGTAGame(console, query) {
	try {
		return await gtaUtil.requestGTAGame(query, console).then(r => {
			if(r.code) {
				return r;
			} else {
				const result = [];
				for (let game of r) {
					result.push({
						game_id: game._id,
						title: game.title,
						picture: game.img,
						console: console,
						subConsole: game.subConsole,
						wish: false,
						totalTrophies: game.totalTrophies,
						trophies: game.trophies,
					})
				}
				return result;
			}
		});
	} catch (e) {
		return new ErrorMessage(400, "Hiba!", e.message);
	}
}

module.exports = router;