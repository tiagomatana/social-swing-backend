/** @namespace application.app.models.Account**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
    id: {
      type: ObjectId
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    last_login: {
        type: Date
    },
    iugu_client_id: {
        type: String
    },
    nivel: {
        type: String,
        default: 'usuario'
    },
    active: {
        type: Boolean,
        default: true
    },
    is_administrador: {
        type: Boolean,
        default: false
    },
    foto: {
        type: String
    },
    capa: {
        type: String
    },
    costumo_estar_online: {
        type: String
    },
    verificacao: {
        type: String
    },
    verificacao_confirmacao: {
        type: String
    },
    status: {
        type: String,
        default: 'ativo'
    },
    sobre: {
        type: String
    },
    bloquear: {
        type: Boolean,
        default: false
    },
    excluir: {
        type: Boolean,
        default: false
    }
});

mongoose.model("account", Account, "account");
