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

const authRouter = require('./routes/authentication.js');
const dashboardRouter = require('./routes/dashboard.js');
const moviesRouter = require('./routes/movies.js');
const gamesRouter = require('./routes/games.js');
const achievementRouter = require('./routes/achievements.js');
const bookRouter = require('./routes/books.js');
const jobsRouter = require('./routes/jobs.js');
const endPointRouter = require('./routes/endpoints.js');
const todoTypeRouter = require('./routes/todotypes.js');
const todoRouter = require('./routes/todos.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/movies', moviesRouter);
app.use('/games', gamesRouter);
app.use('/achievements', achievementRouter);
app.use('/books', bookRouter);
app.use('/update', jobsRouter);
app.use('/endpoint', endPointRouter);
app.use('/todotype', todoTypeRouter);
app.use('/todo', todoRouter);

app.get("/", (req, res) => {
    res.redirect(process.env.FRONTEND_LINK);
});

;(async () => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
})();

