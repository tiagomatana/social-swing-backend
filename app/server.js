const express = require('express');
const consign = require("consign");

const app = express();

consign({cwd: 'app'})
    .include('security')
    .then('interfaces')
    .then('models')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

module.exports = app;
