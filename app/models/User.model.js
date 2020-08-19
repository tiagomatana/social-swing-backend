module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        email: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};
