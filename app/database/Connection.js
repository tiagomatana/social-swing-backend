/** @namespace application.app.database.Connection **/
require('dotenv/config');
const mysql = require('mysql2');
const {
    DATABASE_USER,
    DATABASE_PWD,
    DATABASE_HOST,
    DATABASE_NAME
} = process.env;


module.exports.getConnection = function (){
    return mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USER,
        password: DATABASE_PWD,
        database: DATABASE_NAME
    });
}





