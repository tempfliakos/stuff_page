require('dotenv').config();
const express = require('express');
const Database = require("../util/Database");
const ErrorMessage = require("../util/ErrorMessage");
const router = express.Router();
const database = new Database();

router
	.get("/", async (req, res) => {
		try {
			let id = req.query.id.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			if(!id) {
				throw new Error(`id paraméter kötelező!`);
			} else {
				let result = await database.findById(id);
				if(!result) {
					throw new Error(`Az adott játék nem található!`);
				}
				res.status(200).send(result[0].trophies);
			}
		} catch (e) {
			const errorMessage = new ErrorMessage(400,"Hiba!", e.message);
			res.status(errorMessage.code).send(errorMessage);
		}

	})

module.exports = router;
