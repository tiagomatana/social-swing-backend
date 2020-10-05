const PREFIX_URL = '/api/user'
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function (app) {
    const ctrl = app.controllers.AccountController;
    const security = app.security.JWT;

    app.use(jsonParser)

    app.post(`${PREFIX_URL}/recovery`, async function (req, res) {
       try {
           let result = await ctrl.recoveryPass(req.body);
           res.status(result.code).send(result.body);
       } catch (err) {
           res.send(err)
       }
    });

    app.get(`${PREFIX_URL}/:email`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.getUser(req.params.email);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.send(err)
        }
    })

    app.post(`${PREFIX_URL}/admin`, async function (req, res) {
        try {
            let result = await ctrl.createAdmin(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/create`, async function (req, res) {
        try {
            let result = await ctrl.create(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/login`, async function (req, res) {
        try {
            let result = await ctrl.authenticate(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/logout`, async function (req, res) {
        try {
            let result = await ctrl.logout();
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });
}
