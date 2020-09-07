const PREFIX_URL = '/api/perfil'
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function (app) {
    const ctrl = app.controllers.PerfilController;
    const security = app.security.JWT;

    app.use(jsonParser);

    app.post(`${PREFIX_URL}/create`, async function (req, res) {
        try {
            let result = await ctrl.create(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    app.put(`${PREFIX_URL}/update`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.update(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });
}
