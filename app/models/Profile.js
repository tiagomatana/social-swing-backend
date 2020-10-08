/** @namespace application.app.models.Profile**/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
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

Profile.plugin(mongoosePaginate)
Profile.plugin(aggregatePaginate)

mongoose.model("profile", Profile, "profile");
