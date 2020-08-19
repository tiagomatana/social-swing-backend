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

const db = require("./models");

db.sequelize.sync();

// consign()
//     .include('app/interfaces')
//     .then('app/database')
//     .then('app/routes')
//     .then('app/models')
//     .into(app);

require("./routes/authenticateRest")(app)

module.exports = app;
