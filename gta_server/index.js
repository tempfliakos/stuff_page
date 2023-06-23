require('dotenv').config();

const express = require("express");
const port = process.env.PORT || process.env.GTA_SERVER_PORT || 5000;

const app = express();
const bodyParser = require("body-parser");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Headers", "*")
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

const gamesRouter = require('./routes/games.js');
// const achievementRouter = require('./routes/achievement.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/games', gamesRouter);
// app.use('/achievements', achievementRouter);

app.get("/", (req, res) => {
});

;(async () => {
	app.listen(port, () => {
		console.log(`Server is running on ${port}`);
	});
})();

