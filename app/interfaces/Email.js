/** @namespace application.app.interfaces.Email **/
module.exports.validate = (email) => {
    var validator = require('email-validator');
    return validator.validate(email);
}
