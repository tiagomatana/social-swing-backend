const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/** @namespace application.app.controllers.AccountController**/
module.exports = function (app) {
    const accountService = app.services.AccountService;
    const Response = app.interfaces.Response;
    const Email = app.interfaces.Email;
    const Enum = app.interfaces.Enum;

    return {
        async create(data) {
            if (Email.validate(data.email)) {
                const account = data;
                account.birthdate = new Date(data.birthdate);
                account.password = await new Promise((resolve) => {
                    bcrypt.hash(account.password, 12, function (err, hash) {
                        resolve(hash);
                    });
                });
                return accountService.create(account);
            } else {
                return Response.notAcceptable();
            }
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
            const userFound = await accountService.getAccount(user.email, 1);
            if (!userFound) {
                return Response.unauthorized();
            }
            const pass = user.password;
            const auth = await new Promise((resolve) => {
                bcrypt.compare(pass, userFound.password, (err, valid) => {
                    if (valid) {
                        const {id} = userFound
                        let token = jwt.sign({id}, process.env.SECRET, {
                            expiresIn: 86400 // expires in 1 day
                        });
                        delete userFound.password;
                        userFound.token = token
                        resolve(Response.success({auth: true, user: userFound}));
                    } else {
                        resolve(Response.unauthorized());
                    }
                });
            });
            return auth;
        },
        async logout() {
            return Response.success({auth: false, token: null});
        }
    }
}
