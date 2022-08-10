require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {Movies, UserMovies} = require('../models');
const cors = require("cors");

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

const router = express.Router();

router
	.get("/", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const movies = await UserMovies.findAll({
				where: {user_id: req.user.id},
				include: [
					{
						model: Movies,
					}]
			});
			res.status(200).send(generateMoviesList(movies));
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})

	.get("/ids", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const userId = req.user.id;
			const games = await UserMovies.findAll({
				attributes: ['movie_id'],
				where: {
					user_id: userId,
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
			const data = req.body;
			const {id} = req.user;
			/*let movie = await Movies.findByPk(data.id);
			if (!movie) {
				movie = await Movies.create(data);
			}*/
			let movie = await Movies.upsert(data);
			await UserMovies.create({user_id: id, movie_id: movie.id});
			res.status(200).send(movie);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})

	.put("/:movie", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const data = req.body;
			const userMovie = await UserMovies.findOne({
				where: {
					user_id: id,
					movie_id: data.id,
				}
			});
			await userMovie.update(data, {where: {id: userMovie.id}});
			res.status(200).send(data);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})

	.delete("/:movie", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const movieId = req.params.movie;
			const userMovie = await UserMovies.findOne({
				where: {
					user_id: id,
					movie_id: movieId,
				}
			});
			await userMovie.destroy();
			res.status(202).send(userMovie);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

function generateMoviesList(movies) {
	let movieList = [];
	for (let movie of movies) {
		movieList.push(convertMovie(movie));
	}
	return movieList;
}

function convertMovie(movie) {
	const movieData = movie.Movie;
	return {
		"id": movieData.id,
		"backdrop_path": process.env.TMDB_IMG_LINK + movieData.backdrop_path,
		"poster_path": process.env.TMDB_IMG_LINK + movieData.poster_path,
		"release_date": movieData.release_date,
		"title": movieData.title,
		"genres": movieData.genres,
		"seen": movie.seen,
		"owned": movie.owned,
		"liza": movie.liza,
	}
}

module.exports = router;