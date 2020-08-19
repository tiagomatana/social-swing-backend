require('dotenv/config');
const Sequelize = require("sequelize");

const {
    DATABASE_USER,
    DATABASE_PWD,
    DATABASE_HOST,
    DATABASE_NAME
} = process.env;

var sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PWD, {
    host: DATABASE_HOST,
    dialect: 'mysql',

    pool : {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./User.model")(sequelize, Sequelize);

module.exports = db



