const app = require("./app/server");
const listEndpoints = require('express-list-endpoints');
const mongoose = require("mongoose");
const Logger = app.interfaces.Logger;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
    DATABASE_URI,
    PORT
} = process.env;

connect();

function listen() {
    app.listen(PORT || 3000);
    Logger.log('Express app started on port ' + PORT);
}

function connect() {
    const uri = DATABASE_URI;
    mongoose.connection
        .on('error', Logger.error)
        .on('disconnected', connect)
        .once('open', listen);
    endpointsList();
    return mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
}

function endpointsList() {
    let endpoints = listEndpoints(app);
    Logger.table(endpoints)
}




