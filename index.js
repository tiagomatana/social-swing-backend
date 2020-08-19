var app = require("./app/server");
const listEndpoints = require('express-list-endpoints');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var http = require('http');

const {PORT} = process.env;


function endpointsList() {
    let endpoints = listEndpoints(app);
    console.table(endpoints)
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


var server = http.createServer(app);
server.listen(3000);
console.log("Servidor escutando na porta 3000...")
endpointsList();
