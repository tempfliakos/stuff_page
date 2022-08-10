require('dotenv').config();
const express = require('express');
const cron = require("node-cron");
const axios = require('axios');
const cors = require('cors');
const {Movies} = require('../models');

const router = express.Router();

router
	.get("/", cors(), async (req, res) => {
		try {
			const movies = await Movies.findAll();
			const movieList = await updateMovies(movies);
			res.status(200).send(movieList);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

cron.schedule("0 11 * * *", function () {
	db.many(`SELECT * from user_movie`).then(
		result => {
			updateMovies(result);
		}
	);
	console.info("Movies updated");
});

async function updateMovies(movies) {
	const twoWeeksBefore = new Date();
	twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
	let updatedList = [];
	for (let movie of movies) {
		await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/changes?api_key=05290ff40fe203e2de4b0e9f832245e1&start_date=${formatDate(twoWeeksBefore)}&page=1`).then(
			async (res) => {
				let changed = false;
				for (let o of res.data.changes) {
					if (o.key === "images") {
						const value = o.items[o.items.length - 1].value;
						if (value) {
							if (value.poster && value.poster.iso_639_1 === 'hu') {
								movie.poster_path = value.poster.file_path;
								changed = true;
							}

							if(value.backdrop) {
								movie.backdrop_path = value.backdrop.file_path;
								changed = true;
							}

						}
					} else if (o.key === "release_dates") {
						movie.release_date = o.items[o.items.length - 1].value.release_date;
						changed = true;
					}
				}
				if (changed) {
					const userMovie = await Movies.findByPk(movie.id);
					const updatedMovie = await userMovie.update(movie);
					updatedList.push(updatedMovie);
				}
			}).catch((error) => console.error("Hiba"));
	}
	return updatedList;
}

function formatDate(text) {
	const date = new Date(text);
	const dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: '2-digit', day: '2-digit'});
	const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date);
	return `${year}-${month}-${day}`;
}

module.exports = router;