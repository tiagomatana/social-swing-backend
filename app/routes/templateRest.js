let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

module.exports = function (application) {
    const Response = application.app.interfaces.Response
    const connection = application.app.database.Connection;

    const db = connection.getConnection()
    db.connect(function(err) {
        if (err) throw new Error(err);

        console.info("Connected...");
    });


    application.post('/api/post', jsonParser, async function (req, res) {
        try {
            let result = await Response.success();
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.get('/api/get', async function (req, res) {
        try {
            let result = await Response.success();;
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.put('/api/update', jsonParser, async function (req, res) {
        try {
            let result = await Response.success();
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });

    application.delete('/api/delete', jsonParser, async function (req, res) {
        try {
            let result = await Response.success();
            res.status(result.code).send(result.body)
        } catch (err) {
            res.status(err.code).send(err.body)
        }
    });
};
