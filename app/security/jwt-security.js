module.exports.verifyJWT = (req, res, next) => {
    var jwt = require('jsonwebtoken');
    const Response = require('../interfaces/Response');
    var token = req.headers['x-access-token'];
    if (!token) return res.send(Response.unauthorized());

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.send(Response.internalServerError());
        req.userId = decoded.id;
        next();
    });
}
