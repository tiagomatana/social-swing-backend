const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
// const consign = require("consign");
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const db = require("./database");

db.sequelize.sync();


require("./account/route/account-route")(app)

module.exports = app;
