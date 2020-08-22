module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("Account", {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        surname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        birthdate: {
            type: 'DATETIME',
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: 'DATETIME'
        },
        iugu_client_id: {
            type: Sequelize.STRING
        },
        nivel: {
            type: Sequelize.STRING,
            defaultValue: 'usuario'
        },
        active: {
            type: 'BOOL',
            defaultValue: true
        },
        is_administrador: {
            type: 'BOOL',
            defaultValue: false
        },
        foto: {
            type: Sequelize.STRING
        },
        capa: {
            type: Sequelize.STRING
        },
        costumo_estar_online: {
            type: Sequelize.STRING
        },
        verificacao: {
            type: Sequelize.STRING
        },
        verificacao_confirmacao: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'ativo'
        },
        sobre: {
            type: Sequelize.STRING
        },
        bloquear: {
            type: 'BOOL',
            defaultValue: false
        },
        excluir: {
            type: 'BOOL',
            defaultValue: false
        }
    });

    return Account;
};
