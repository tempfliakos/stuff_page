require('dotenv').config();
const express = require('express');
const {TodoType, Todo} = require('../models');
const jwtMiddleware = require("express-jwt");
const router = express.Router();

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

router
	.get("/", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const todos = await Todo.findAll({
				where: {user_id: req.user.id},
				include: [
					{
						model: TodoType,
					}]
			});
			res.status(200).send(todos);
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

			const todo = await Todo.create(body);
			res.status(200).send(todo);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.put("/:todoId", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const data = req.body;
			const todo = await Todo.findByPk(data.id);
			await todo.update(data, {where: {id: todo.id}});
			res.status(200).send(data);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.delete("/:todoId", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const todoId = req.params.todoId;
			const todo = await Todo.findOne({
				where: {
					id: todoId,
					user_id: id,
				}
			});
			await todo.destroy();
			res.status(202).send(todo);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

module.exports = router;