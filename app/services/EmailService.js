const nodemailer = require('nodemailer')
const user = process.env.USER_EMAIL;
const pass = process.env.USER_EMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: process.env.USER_EMAIL_SMTP,
    port: 587,
    auth: {
        user, pass
    }
});
/** @namespace application.app.services.EmailService **/
module.exports = function (app) {
    const Logger = app.interfaces.Logger;
    return {
        async send(data){
            return await transporter.sendMail({
                from: user,
                to: data.email,
                replayTo: user,
                secure: true,
                subject: data.subject,
                html: data.body
            }).then(info => {
                Logger.info(info);
            }).catch(error => {
                Logger.error(error);
            })
        }
    }
}



