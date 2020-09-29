const jwt = require('jsonwebtoken');
describe('JWT.js Test', function (){
    let ResponseService = require("../../app/interfaces/Response");

    let security = require('../../app/security/JWT');
    let res = {
        send: () => {}
    }
    let req = {
        headers: {
            'x-access-token': 'abcdefghijklmnopqrstuvyxwz'
        }
    }

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        // await mongoose.connection.close()
        done()
    })

    beforeEach(function (){

    });

    test('verifyJWT success', () => {
        process.env.SECRET = 'TESTE';
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            return Promise.resolve(69);
        });
        security.verifyJWT(req, res, ()=>{});
        expect(jwt.verify).toBeCalledTimes(1);
    });

    test('verifyJWT no token', () => {
        process.env.SECRET = 'TESTE';
        req.headers["x-access-token"] = null;
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            return Promise.resolve(69);
        });
        jest.spyOn(ResponseService, 'unauthorized');
        security.verifyJWT(req, res, ()=>{});
        expect(jwt.verify).toBeCalledTimes(0);
        expect(ResponseService.unauthorized).toBeCalledTimes(1);
    });

    test('verifyJWT failed', () => {
        try {
            process.env.SECRET = 'TESTE';
            delete req.headers;
            jest.spyOn(jwt, 'verify').mockImplementation(() => {
                throw new Error()
            });
            jest.spyOn(ResponseService, 'unauthorized');
            security.verifyJWT(req, res, ()=>{});
            expect(jwt.verify).toBeCalledTimes(0);
        } catch (e) {
            expect(ResponseService.unauthorized).toBeCalledTimes(1);
        }
    });
})
