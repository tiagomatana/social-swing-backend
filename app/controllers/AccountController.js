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
                let salt = bcrypt.genSaltSync(10);
                data.password = bcrypt.hashSync(data.password, salt)
                return accountService.create(data);
            } else {
                return Response.notAcceptable();
            }
        },
        async createAdmin(data) {
            if (data.secret !== process.env.SECRET) {
                return Response.notAcceptable();
            } else {
                delete data.secret;
                data.nivel = Enum.ADMINISTRATOR.value;
                data.is_administrador = true;
                return await this.create(data);
            }
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
            let valid = bcrypt.compareSync(pass, userFound.password);
            if (valid) {
                const {_id} = userFound
                let token = jwt.sign({_id}, process.env.SECRET, {
                    expiresIn: 86400 // expires in 1 day
                });
                delete userFound.password;
                userFound.token = token
                return Response.success({auth: true, user: userFound});
            } else {
                return Response.unauthorized();
            }
        },
        async logout() {
            return Response.success({auth: false, token: null});
        }
    }
}
