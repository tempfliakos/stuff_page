require('dotenv').config();

const express = require("express");
const port = process.env.PORT;

const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const db = require('./db');

const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/movies/:user", cors(), (req, res) => {
    return db.many(`SELECT * FROM user_movie where user_id = ${req.params.user.split('=')[1]}`)
        .then(function (data) {
            res.send(data);
        }).catch(function (error) {
            console.log("error:", error);
            res.send("Error occured...");
        });
});

app.post("/movies", (req, res) => {
    const data = req.body;
    db.query(`INSERT INTO user_movie(user_id, movie_id, backdrop_path, poster_path, release_date, title,seen,genres) 
    VALUES(${data.user_id}, ${data.movie_id}, '${data.backdrop_path}', '${data.poster_path}', '${data.release_date}', '${data.title}', ${data.seen},'${"{" + data.genres + "}"}');`,
        (err, res) => {
            console.log(err, res);
            db.end();
        });
    res.send(data);
});

app.post("/login", (req, res) => {
    const data = req.body;
    db.one(`SELECT id,password from users where email = '${data.email}'`).then(
        result => {
            if (bcrypt.compareSync(data.password, result.password)) {
                console.log(result);
                res.send({id: result.id});
            } else {
                res.status(401).send("Rossz email és jelszó pár!");
            }
        }
    ).catch(function (error) {
        res.status(401).send("Rossz email!");
    });
});

app.post("/register", (req, res) => {
    const data = req.body;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    db.query(`INSERT INTO users(email,password) VALUES('${data.email}', '${password}');`,
        (err, res) => {
            db.end();
        }).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        return res.status(400).send({
            message: 'This is an error!'
        });
    })


});

app.put("/movies/:movie", (req, res) => {
    db.query(`UPDATE user_movie SET seen = ${req.body.seen} WHERE movie_id = ${req.body.movie_id} and user_id = ${req.body.user_id}`);
    res.send(req.body);
})

app.delete("/movies/:movie", (req, res) => {
    db.query(`DELETE FROM user_movie WHERE movie_id = ${req.params.movie}`);
    res.send(req.params.movie);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

