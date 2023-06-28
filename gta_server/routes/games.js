require('dotenv').config();
const express = require('express');
const Database = require("../util/Database");
const ErrorMessage = require("../util/ErrorMessage");
const router = express.Router();
const database = new Database();
const MIN_QUERY_LENGTH = 3;

router
	.get("/", async (req, res) => {
		try {
			let console = req.query.console.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			let query = req.query.q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			if(query.length < MIN_QUERY_LENGTH) {
				throw new Error(`Legalább ${MIN_QUERY_LENGTH} karaktert adjon meg!`);
			} else {
				let result = await database.find(console, query);
				res.status(200).send(result);
			}
		} catch (e) {
			const errorMessage = new ErrorMessage(400,"Hiba!", e.message);
			res.status(errorMessage.code).send(errorMessage);
		}

	})

module.exports = router;
