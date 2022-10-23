require('dotenv').config();
const express = require('express');
const axios = require("axios");

const router = express.Router();

let IGDBToken = 't4zqj4xp60ehhjtj62rpcrb6knyzx1';

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
		await getIGDBGame("Xbox", query, res);
	})
	.get("/playstation/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		await getIGDBGame("Playstation", query, res);
	})
	.get("/switch/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		await getIGDBGame("Switch", query, res);
	})
	.get("/wish/:query", async (req, res) => {
		const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		await getIGDBGame(null, query, res);
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

async function getIGDBGame(console, query, res) {
	try {
		await sendToIGDB(query, res, true).then(r => {
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
			res.status(200).send(result);
		});
	} catch (e) {
		res.status(400).send({
			message: e.message,
		});
	}
}

async function sendToIGDB(title, res, isRefreshable) {
	const headers = {
		"Content-Type": "application/json;charset=utf-8",
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
			return await sendToIGDB(title, res, false);
		}
		res.status(400).send({
			message: e.message,
		});
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
		console.error(e.message);
	});
}

module.exports = router;