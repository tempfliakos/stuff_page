require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {Books, UserMovies} = require('../models');
const cors = require('cors');

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

const router = express.Router();

router
	.get("/", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const userId = req.user.id;
			const books = await Books.findAll({
				where: {
					user_id: userId,
				}
			});
			res.status(200).send(books);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.get("/ids", jwtMiddleware(jwtOptions), cors(), async (req, res) => {
		try {
			const userId = req.user.id;
			const books = await Books.findAll({
				attributes: ['book_id'],
				where: {
					user_id: userId,
				}
			});
			res.status(200).send(books);
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
			let userBook = await Books.findOne({
				where: {
					user_id: id,
					book_id: data.book_id,
				}
			});
			if (!userBook) {
				userBook = await Books.create({
					user_id: id,
					book_id: data.book_id,
					author: data.author,
					description: data.description,
					picture: data.picture,
					page: data.page,
					title: data.title
				});
			}
			res.status(200).send(userBook);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})
	.delete("/:book", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const bookId = req.params.book;
			const userBook = await Books.findOne({
				where: {
					user_id: id,
					book_id: bookId,
				}
			});
			await userBook.destroy();
			res.status(202).send(userBook);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

module.exports = router;