/** @namespace application.app.models.Account**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema({
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
    birthdate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    last_login: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    },
    is_administrator: {
        type: Boolean,
        default: false
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'created_at'}});

mongoose.model("account", Account, "account");
