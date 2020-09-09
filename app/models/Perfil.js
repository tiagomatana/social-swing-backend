/** @namespace application.app.models.Perfil**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Perfil = new Schema({
    _id: {
      type: ObjectId
    },
    nome: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    orientacao_sexual: {
        type: String
    },
    nascimento: {
        type: Date,
        required: true
    },
    signo: {
        type: String
    },
    altura: {
        type: Number
    },
    peso: {
        type: Number
    },
    estado_civil: {
        type: String
    },
    tipo_fisico: {
        type: String
    },
    hobby: {
        type: String
    },
    fantasias: {
        type: String
    },
    estilo: {
        type: String
    },
    lazer: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at'}});

mongoose.model("perfil", Perfil, "perfil");
