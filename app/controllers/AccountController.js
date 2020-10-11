const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = process.env.TEMPLATES
let bodyRecovery;
let activateAccount;
fs.readFile(path + "recovery.html", function (err, data) {
    if (data) {
        bodyRecovery = data.toString();
    }
});
fs.readFile(path + "activate.html", function (err, data) {
    if (data) {
        activateAccount = data.toString();
    }
});


/** @namespace application.app.controllers.AccountController**/
module.exports = function (app) {
    const accountService = app.services.AccountService;
    const profileService = app.services.ProfileService;
    const Response = app.interfaces.Response;
    const Email = app.interfaces.Email;
    const Enum = app.interfaces.Enum;
    const emailService = app.services.EmailService;
    const salt = bcrypt.genSaltSync(10);

    return {
        async create(user, host) {

            if (!Email.validate(user.email)) {
                return Response.notAcceptable();
            }
            user.password = bcrypt.hashSync(user.password, salt)
            let result = await accountService.create(user);
            let _id = result._id.toString();
            let token = jwt.sign({_id}, process.env.SECRET, {
                expiresIn: 43200 // expires in 12 hours
            });
            let link = host + "/api/user/validate/" + token;
            const data = {
                email: result.email,
                subject: '[ATIVAR CONTA]',
                body: activateAccount.replace(/linkToActivate/, link)
            }
            emailService.send(data);
            return Response.success(result._id);

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
        async update(user) {
            return accountService.update(user);
        },
        async getUser(email) {
            try {
                const user = await accountService.getAccount(email);
                return Response.success(user);
            } catch (e) {
                return e;
            }
        },
        async recoveryPass(user) {
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
                    emailService.send(data);
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
            const userFound = await accountService.getAccount({email: user.email});
            if (!userFound) {
                return Response.unauthorized();
            } else if (userFound.is_blocked || !userFound.active) {
                return Response.unauthorized();
            }
            const pass = user.password;
            let valid = bcrypt.compareSync(pass, userFound.password);
            if (valid) {
                const {_id} = userFound
                let token = jwt.sign({_id}, process.env.SECRET, {
                    expiresIn: 43200 // expires in 12 hours
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
        },
        async disable(email) {
            return accountService.disable(email);
        },
        async verify(id) {
            let user = await accountService.getAccount({_id: id});
            if (user) {
                user.active = true;
                await this.update(user);
            }
            return user;
        },
        async deleteAccount(id) {
            let result = await accountService.deleteAccount(id);
            if (result) {
                await profileService.remove(id)
                return Response.success(id);
            } else {
                return Response.notAcceptable(id)
            }

        }
    }
}
