require('dotenv').config();

const express = require("express");
const port = process.env.PORT || process.env.SERVER_PORT;

const app = express();
const bodyParser = require("body-parser");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Headers", "*")
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

const gamesRouter = require('./routes/games.js');
const achievementRouter = require('./routes/achievements.js');
const ErrorMessage = require("./util/ErrorMessage");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const isAuth = (req, res, next) => {
	const auth = req.headers.authorization;
	if(auth === process.env.GTA_AUTH) {
		next();
	} else {
		const errorMsg = new ErrorMessage(401, "Hiba!", "Hozzáférés megtagadva");
		res.status(401).send(errorMsg);
	}
}

app.use("/", isAuth, function (req, res, next) {
	const date = new Date();
	console.log(`A new request received at ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
	next();
});
app.use('/games', gamesRouter);
app.use('/achievements', achievementRouter);

app.get("/", (req, res) => {
});

;(async () => {
	app.listen(port, () => {
		console.log(`Server is running on ${port}`);
	});
})();


