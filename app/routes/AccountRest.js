const PREFIX_URL = '/api/user'
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function (app) {
    const ctrl = app.controllers.AccountController;

    app.post(`${PREFIX_URL}/recovery`, jsonParser, async function (req, res) {
       try {
           let result = await ctrl.recoveryPass(req.body);
           res.status(result.code).send(result.body);
       } catch (err) {
           res.send(err)
       }
    });

    app.post(`${PREFIX_URL}/admin`, jsonParser, async function (req, res) {
        try {
            let result = await ctrl.createAdmin(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/create`, jsonParser, async function (req, res) {
        try {
            let result = await ctrl.create(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/login`, jsonParser, async function (req, res) {
        try {
            let result = await ctrl.authenticate(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/logout`, jsonParser, async function (req, res) {
        try {
            let result = await ctrl.logout();
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });
}
