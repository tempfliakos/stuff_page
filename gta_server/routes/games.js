require('dotenv').config();
const express = require('express');
const Database = require("../util/Database");
const router = express.Router();
//const database = new Database();

router
	.get("/:console/:query", async (req, res) => {
		try {
			const console = req.params.console.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const query = req.params.query.split('=')[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			//let result = await database.find();
			res.status(200).send({console, query});
		} catch (e) {
			res.status(400).send({
				message: e.message,
			});
		}

	})

module.exports = router;
