require('dotenv').config();
const express = require('express');
const {TodoType} = require('../models');
const jwtMiddleware = require("express-jwt");
const router = express.Router();

const jwtOptions = {
	secret: process.env.SECRET,
	algorithms: ['HS256'],
}

router
	.get("/", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const types = await TodoType.findAll();
			res.status(200).send(types);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.post("/", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const body = req.body;
			const todoType = await TodoType.create(body);
			res.status(200).send(todoType);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}
	})
	.delete("/:todoTypeId", jwtMiddleware(jwtOptions), async (req, res) => {
		try {
			const {id} = req.user;
			const todoTypeId = req.params.todoTypeId;
			const todoType = await TodoType.findOne({
				where: {
					id: todoTypeId,
					user_id: id,
				}
			});
			await todoType.destroy();
			res.status(202).send(todoType);
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

module.exports = router;