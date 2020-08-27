const PREFIX_URL = '/api/user'

module.exports = function (application) {
    const ctrl = require("../controller/account.controller")

    application.post(`${PREFIX_URL}/admin`, ctrl.createAdmin);
    application.post(`${PREFIX_URL}/create`, ctrl.create);
    application.post(`${PREFIX_URL}/login`, ctrl.authenticate);
    application.post(`${PREFIX_URL}/logout`, ctrl.logout);
}
