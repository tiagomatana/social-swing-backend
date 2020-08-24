const app = require("./app/server");
const listEndpoints = require('express-list-endpoints');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const Logger = require('./app/interfaces/Logger')

const {PORT} = process.env;

function endpointsList() {
    let endpoints = listEndpoints(app);
    Logger.table(endpoints)
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


var server = http.createServer(app);
server.listen(PORT || 3000);
Logger.log("Servidor escutando na porta 3000...");
endpointsList();
