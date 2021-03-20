const url = require("url");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();

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
})
