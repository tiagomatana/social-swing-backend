const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/** @namespace application.app.controllers.AccountController**/
module.exports = function (app) {
    const accountService = app.services.AccountService;
    const Response = app.interfaces.Response;
    const Email = app.interfaces.Email;
    const Enum = app.interfaces.Enum;


    function validateData(data) {
        if (!data.password) return false;
        return is18(data.birthdate);
    }

    function is18(birthdate) {
        birthdate = new Date(birthdate);
        const today = new Date();
        let years = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth() - birthdate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            years--;
        }

        return years >= 18;
    }

    return {
        async create(data) {
            return new Promise(async (resolve) => {
                if (validateData(data) && Email.validate(data.email)) {
                    const account = data;
                    account.birthdate = new Date(data.birthdate);
                    bcrypt.hash(account.password, 12, function (err, hash) {
                        account.password = hash;
                        resolve(accountService.create(account));
                    });
                } else {
                    resolve(Response.notAcceptable());
                }
            });

        },
        async createAdmin(data) {
            return new Promise(async (resolve) => {
                if (data.secret !== process.env.SECRET) {
                    resolve(Response.notAcceptable());
                } else {
                    delete data.secret;
                    data.nivel = Enum.ADMINISTRATOR.value;
                    data.is_administrador = true;
                    resolve(this.create(data));
                }
            });
        },
        async authenticate(user) {
            if (!Email.validate(user.email)) {
                return Response.notAcceptable(`${user.email} is not a email`);
            }
            return new Promise(async (resolve) => {
                const userFound = await accountService.getAccount(user.email);
                if (userFound) {
                    bcrypt.compare(user.password, userFound.password, function (err, valid) {
                        if (valid) {
                            const {id} = userFound
                            let token = jwt.sign({id}, process.env.SECRET, {
                                expiresIn: 86400 // expires in 1 day
                            });
                            resolve(Response.success({auth: true, token: token}));
                        } else {
                            resolve(Response.unauthorized());
                        }
                    });
                } else {
                    resolve(Response.unauthorized());
                }
            });
        },
        async logout() {
            return Response.success({auth: false, token: null});
        }
    }
}