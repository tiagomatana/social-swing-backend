const db = require("../../database");
const Account = db.Account;
const jwt = require('jsonwebtoken');
const Response = require('../../interfaces/Response');
const Enum = require('../model/account.enum')
const Email = require('../../interfaces/Email');

exports.create = (req, res) => {
    const bcrypt = require('bcrypt');
    req.body.birthdate = new Date(req.body.birthdate);
    if (validateData(req, res)){
        const account = Account.build(req.body);
        bcrypt.hash(account.password, 12, function (err, hash){
            account.password = hash
            Account.create(account.dataValues)
                .then(data => {
                    res.send(Response.success());
                })
                .catch(err => {
                    res.send(Response.internalServerError(err))
                });
        });
    }
};

exports.createAdmin = (req, res) => {
    if (req.body.secret != process.env.SECRET){
        res.send(Response.notAcceptable());
        return;
    } else {
        delete req.body.secret;
        req.body.nivel = Enum.ADMINISTRATOR.value;
        req.body.is_administrador = true;
        this.create(req, res);
    }

};

exports.authenticate = (req, res) => {
    if (!Email.validate(req.body.email)) {
        res.send(Response.notAcceptable(`${req.body.email} is not a email`));
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const bcrypt = require('bcrypt');
    getAccount(email)
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function (err, valid){
                    if (valid){
                        const {id} = userFound
                        var token = jwt.sign({id}, process.env.SECRET, {
                            expiresIn: 86400 // expires in 1 day

                        });
                        res.send({auth: true, token: token});
                    } else {
                        res.send(Response.unauthorized())
                    }
                });
            } else {
                res.send(Response.unauthorized())
            }
        })
        .catch(err => {
            res.send(Response.internalServerError())
        });
};

exports.logout = (req, res) => {
    res.send({ auth: false, token: null });
}

async function getAccount(email) {
    return Account.findOne({ where: { email} })
        .then(data => {
            if (data) {
                const userFound = data['dataValues']
                return userFound;
            } else {
                return null;
            }
        }).catch(err => {
            return null;
    });
}

function is18(birthdate) {
    const today = new Date();
    var years = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())){
        years--;
    }

    return years >=18;
}

function validateData (req, res) {
    if (!req.body.password || !Email.validate(req.body.email)) {
        res.send(Response.notAcceptable());
        return false;
    }
    if (!is18(req.body.birthdate)) {
        res.send(Response.notAcceptable('years old under 18'));
        return false;
    }
    getAccount(req.body.email).then(data => {
        if (data) {
            res.send(Response.notAcceptable('User exists'));
            return false;
        }
    })
}
