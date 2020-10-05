const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyRecovery = "<h2>Recuperação de acesso</h2><p>Senha temporária: <strong>password</strong></p><h3>O que devo fazer agora?</h3><p>Acesse a plataforma com a senha temporária e altere sua senha o quanto antes.</p>"


/** @namespace application.app.controllers.AccountController**/
module.exports = function (app) {
    const accountService = app.services.AccountService;
    const Response = app.interfaces.Response;
    const Email = app.interfaces.Email;
    const Enum = app.interfaces.Enum;
    const email = app.services.EmailService;
    const salt = bcrypt.genSaltSync(10);

    return {
        async create(data) {
            if (Email.validate(data.email)) {
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
        async update(user){
            return accountService.update(user);
        },
        async recoveryPass(user){
            try {
                const userFound = await accountService.getAccount(user.email, 1);
                if (userFound) {
                    let pass = Math.random().toString(36).slice(-10)
                    userFound.password = bcrypt.hashSync(pass, salt);
                    await this.update(userFound);
                    let data = {
                        email: userFound.email,
                        subject: '[RECUPERAR SENHA]',
                        body: bodyRecovery.replace(/password/, pass)
                    }
                    email.send(data);
                }
                return Response.success();

            } catch (err) {
                return Response.internalServerError(err);
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
                userFound.last_login = Date.now();
                await this.update(userFound);
                return Response.success({auth: true, token: token});
            } else {
                return Response.unauthorized();
            }
        },
        async logout() {
            return Response.success({auth: false, token: null});
        }
    }
}
