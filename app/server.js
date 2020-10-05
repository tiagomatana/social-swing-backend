const express = require('express');
const consign = require("consign");

const app = express();
process.env.TEMPLATES = __dirname + "/html/";
consign({cwd: 'app'})
    .include('security')
    .then('interfaces')
    .then('models')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;
