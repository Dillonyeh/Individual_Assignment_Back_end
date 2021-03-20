const url = require("url");
const mysql = require("mysql");
const express = require("express");
const app = express();

app.all("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if ("OPTIONS" == req.method) {
        return res.sendStatus(200);
    }
    next();
});

const db = mysql.createConnection({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b880b15de75399",
    password: "f6a6ad60",
    database: "heroku_40b03f318aa3c7d"
});
db.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log("Connected");
});

app.get("/questions", (req, res) => {
    let sql_statement = "SELECT * FROM questions";
    db.query(sql_statement, (err, result) => {
        if (err) {
            res.end(err.message);
        } else {
            let quizQuestions = JSON.stringify(result);
            res.end(quizQuestions);
        }
    });
});

app.post("/questions", (req, res) => {
    let q = url.parse(req.url, true);
    let a1 = q.query['a1'];
    let a2 = q.query['a2'];
    let a3 = q.query['a3'];
    let a4 = q.query['a4'];
    let question = q.query['question'];
    let correct_answer = q.query['correct_answer'];
    let sql_statement;
    sql_statement = `INSERT INTO questions (question, a1, a2, a3, a4, correct_answer) values ('${question}', '${a1}', '${a2}', '${a3}', '${a4}', '${correct_answer}');` 
    db.query(sql_statement, (err) => {
        if (err) {
            res.end(err.message);
        } else {
            res.end("Question Added");
        }
    });
});

app.put("/questions", (req, res) => {
    let q = url.parse(req.url, true);
    let a1 = q.query['a1'];
    let a2 = q.query['a2'];
    let a3 = q.query['a3'];
    let a4 = q.query['a4'];
    let question = q.query['question'];
    let correct_answer = q.query['correct_answer'];
    let sql_statement;
    sql_statement = `UPDATE questions SET a1='${a1}', a2='${a2}', a3='${a3}', a4='${a4}', correct_answer='${correct_answer}' WHERE question='${question}';`
    db.query(sql_statement, (err) => {
        if (err) {
            res.end(err.message);
        } else {
            res.end()
        }
    });
});

app.listen(8000);