const request = require('supertest');
const server = require('../../app/server');
const jwt = require('jsonwebtoken');

describe('ProfileRest.js Tests', () => {

    let token;

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        // await mongoose.connection.close()
        done()
    })

    beforeAll((done) => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            return Promise.resolve(69);
        });
        request(server)
            .post('/api/user/login')
            .send({
                username: 'user',
                password: 'pw',
            })
            .end((err, response) => {
                token = response.body.token; // save the token!
                done();
            });
    });

    test('/api/profile/create', async () => {
        jest.spyOn(server.security.JWT, 'verifyJWT').mockImplementation((req, res, next) => {
            done()
            next()
        })
        jest.spyOn(server.controllers.ProfileController, "create").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .post('/api/profile/create')
            .set('x-access-token', '69')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.ProfileController.create).toBeCalledTimes(1);
    });

    test('/api/profile/create error', async (done) => {
        jest.setTimeout(30000)
        jest.spyOn(server.security.JWT, 'verifyJWT').mockImplementation((req, res, next) => {
            done()
            next()
        })
        spyOn(server.interfaces.Response, 'internalServerError');
        try {
            jest.spyOn(server.controllers.ProfileController, "create").mockImplementation(() => {
                done();
                throw new Error();
            });
            await request(server)
                .post('/api/profile/create')
                .set('x-access-token', '69')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(server.controllers.ProfileController.create).toBeCalledTimes(1);
            done();
        } catch (e) {
            expect(server.interfaces.Response.internalServerError).toBeCalledTimes(1)
        }
    });

    test('/api/profile/update', async (done) => {
        jest.spyOn(server.security.JWT, 'verifyJWT').mockImplementation((req, res, next) => {
            done()
            next()
        })
        jest.spyOn(server.controllers.ProfileController, "update").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .put('/api/profile/update')
            .set('x-access-token', '69')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.ProfileController.update).toBeCalledTimes(1);
        done();
    });

    test('/api/profile/update error', async (done) => {
        jest.setTimeout(30000)
        spyOn(server.interfaces.Response, 'internalServerError');
        try {
            jest.spyOn(server.controllers.ProfileController, "update").mockImplementation(() => {
                done();
                throw new Error();
            });
            await request(server)
                .put('/api/profile/update')
                .set('x-access-token', '69')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(server.controllers.ProfileController.update).toBeCalledTimes(1);
            done();
        } catch (e) {
            expect(server.interfaces.Response.internalServerError).toBeCalledTimes(1)
        }
    });
});
