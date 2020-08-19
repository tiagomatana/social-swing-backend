var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
require('dotenv/config');
var jwt = require('jsonwebtoken');

module.exports = function (application) {
    const users = require("../controllers/user.controller")

    function verifyJWT(req, res, next){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });


    }

    application.post('/create', verifyJWT, users.create);
    application.get('/user/:id', verifyJWT, users.findOne);
    application.post('/api/login', users.authenticate);

    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
    application.use(cookieParser());
    application.post('/login', (req, res, next) => {
        //esse teste abaixo deve ser feito no seu banco de dados
        var user = users.authenticate(req, res)

        // console.log(user)
        // if (users.authenticate(req, res)) {
        //     //auth ok
        //     const id = 1; //esse id viria do banco de dados
        //     var token = jwt.sign({id}, process.env.SECRET, {
        //         expiresIn: 60 // expires in 5min
        //     });
        //     return res.json({auth: true, token: token});
        // }
        //
        // res.status(500).json({message: 'Login inválido!'});
    });

    application.post('/logout', function(req, res) {
        res.json({ auth: false, token: null });
    })

    function verifyJWT(req, res, next){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });


    }

    application.get('/clientes', verifyJWT, (req, res, next) => {
        console.log("Retornou todos clientes!");
        res.json([{id:1,nome:'luiz'}]);
    })
}
