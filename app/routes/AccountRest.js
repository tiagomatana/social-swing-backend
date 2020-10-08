const PREFIX_URL = '/api/user'
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (app) {
    const ctrl = app.controllers.AccountController;
    const security = app.security.JWT;
    const Response = app.interfaces.Response;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

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

    app.get('/', security.verifyJWT, async function (req, res) {
        let result = Response.success(req.user._id);
        res.status(result.code).send(result.body);
    });

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
    });

    app.get(`${PREFIX_URL}/validate/:token`, async function (req, res) {
        try {
            let id = await security.getUserId(req.params.token);
            let user = await ctrl.verify(id);
            if (user._id.toString() === id) {
                let path = process.env.TEMPLATES;
                res.sendFile(`${path}/email-verified.html`);
            } else {
                res.send('Error')
            }

        } catch (e) {
            res.send('Error')
        }
    })

    app.post(`${PREFIX_URL}/admin`, async function (req, res) {
        try {
            let result = await ctrl.createAdmin(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.send(app.interfaces.Response.internalServerError())
        }
    });

    app.post(`${PREFIX_URL}/create`, async function (req, res) {
        try {
            let result = await ctrl.create(req.body);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.send(app.interfaces.Response.internalServerError())
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

    app.delete(`${PREFIX_URL}`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.deleteAccount(req.user._id);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });

    app.put(`${PREFIX_URL}/disable`, security.verifyJWT, async function (req, res) {
        try {
            let result = await ctrl.disable(req.user._id);
            res.status(result.code).send(result.body);
        } catch (err) {
            res.status(app.interfaces.Response.internalServerError())
        }
    });
}
