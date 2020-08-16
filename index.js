var app = require("./config/server");
const listEndpoints = require('express-list-endpoints');
const {PORT} = process.env;


function endpointsList() {
    let endpoints = listEndpoints(app);
    console.table(endpoints)
}


app.listen(PORT);
endpointsList();
