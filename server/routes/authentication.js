require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Users} = require('../models');

const router = express.Router();

router
	.post("/login", async (req, res) => {
		try {
			const {email, password} = req.body;
			const user = await Users.findOne({where: {email: email.toLowerCase()}});
			if (!user) {
				res.sendStatus(401);
			}

			if (bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign({"id": user.id, email: email.toLowerCase()}, process.env.SECRET, {algorithm: 'HS256'});
				res.status(200).send({
					accessToken: token,
					user: sendUser(user),
				});
			} else {
				res.status(401).send("Rossz email és jelszó pár!");
			}
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})

	.post("/register", async (req, res) => {
		try {
			const {email, password} = req.body;
			const hashedPassword = bcrypt.hashSync(password, 10);
			const user = await Users.create({email: email.toLowerCase(), password: hashedPassword});
			res.status(200).send({user: sendUser(user)});
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	});

function sendUser(user) {
	return {
		id: user.id,
		email: user.email,
	}
}

module.exports = router;
