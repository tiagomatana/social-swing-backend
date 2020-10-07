/** @namespace application.app.models.Profile**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = new Schema({
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

mongoose.model("profile", Profile, "profile");
