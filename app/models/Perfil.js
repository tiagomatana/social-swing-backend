/** @namespace application.app.models.Perfil**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Perfil = new Schema({
    orientacao_sexual: {
        type: String
    },
    foto: {
        type: Buffer
    },
    relacionamento: {
        type: String
    },
    sobre: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at'}});

mongoose.model("perfil", Perfil, "perfil");
