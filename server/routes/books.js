require('dotenv').config();
const express = require('express');
const jwtMiddleware = require('express-jwt');
const {Books} = require('../models');
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

			if (userBook) {
				userBook = await userBook.update({
					user_id: id,
					book_id: data.book_id,
					author: data.author,
					description: data.description,
					picture: data.picture,
					page: data.page,
					title: data.title,
					priority: data.priority,
					owned: data.owned
				});
			} else {
				const nextPriority = await Books.count({
					where: {
						user_id: id
					}
				}) + 1;
				userBook = await Books.create({
					user_id: id,
					book_id: data.book_id,
					author: data.author,
					description: data.description,
					picture: data.picture,
					page: data.page,
					title: data.title,
					priority: nextPriority,
					owned: data.owned
				});
			}
			res.status(200).send(userBook);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})
	.put("/:book", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const data = req.body;
			let books = await Books.findAll({
				where: {
					user_id: id
				},
				order: [['priority', 'ASC']]
			});
			let priority = 1;
			let result = [];
			for (let book of books) {
				if (book.book_id === data.book_id) {
					book.priority = data.priority;
					book.owned = data.owned;
				} else {
					priority = priority === data.priority ? priority + 1 : priority;
					book.priority = priority;
					priority++;
				}
				result.push(book.dataValues);
			}
			result = result.sort((a, b) => a.priority - b.priority);
			for (let i = 0; i < result.length; i++) {
				await updateBook(result[i], i + 1);
			}
			res.status(200).send(result);
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

async function updateBook(book, priority) {
	const updateAble = {
		priority: priority,
		owned: book.owned
	}
	Books.update(updateAble, {where: {id: book.id}});
}

module.exports = router;