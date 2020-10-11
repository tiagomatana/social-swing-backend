const Response = require('../interfaces/Response');

/** @namespace application.app.security.JWT**/
module.exports.verifyJWT = async (req, res, next) => {
    try {
        const jwt = require('jsonwebtoken');
        const token = req.headers['x-access-token'];
        if (!token) return res.send(Response.unauthorized());
        req.user = await jwt.verify(token, process.env.SECRET);
        next();
    } catch(e) {
        res.send(Response.unauthorized())
    }
}

module.exports.getUserId = async (token) => {
    try {
        const jwt = require('jsonwebtoken');
        const user = await jwt.verify(token, process.env.SECRET);
        return user._id;
    } catch (e) {
        return null;
    }

}
