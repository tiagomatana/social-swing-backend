const app = require("./app/server");
const listEndpoints = require('express-list-endpoints');
const mongoose = require("mongoose");
const Logger = app.interfaces.Logger;

const {
    DATABASE_URI,
    PORT
} = process.env;

connect();

function listen() {
    app.listen(PORT);
    Logger.log('Express app started on port ' + PORT);
}

function connect() {
    const uri = DATABASE_URI;
    mongoose.connection
        .on('error', Logger.error)
        .on('disconnected', connect)
        .once('open', listen);
    endpointsList();
    return mongoose.connect(uri);
}

function endpointsList() {
    let endpoints = listEndpoints(app);
    Logger.table(endpoints)
}




