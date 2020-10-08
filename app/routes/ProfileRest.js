const PREFIX_URL = '/api/profile'
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');

module.exports = function (app) {
    const ctrl = app.controllers.ProfileController;
    const security = app.security.JWT;

    app.use(cors());
    app.use(jsonParser);
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.post(`${PREFIX_URL}/create`, security.verifyJWT, async function (req, res) {
        try {
            req.body._id = req.user._id;
            let result = await ctrl.create(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.put(`${PREFIX_URL}/update`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.update(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/list`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.list(req.body, req.user._id);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });
}
