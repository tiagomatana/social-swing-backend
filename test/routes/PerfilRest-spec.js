const request = require('supertest');
const server = require('../../app/server');
const jwt = require('jsonwebtoken');

describe('PerfilRest.js Tests', () => {

    let token;

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

    test('/api/perfil/create', async () => {
        jest.spyOn(server.controllers.PerfilController, "create").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .post('/api/perfil/create')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.PerfilController.create).toBeCalledTimes(1);
    });

    test('/api/perfil/create error', async (done) => {
        jest.setTimeout(30000)
        spyOn(server.interfaces.Response, 'internalServerError');
        try {
            jest.spyOn(server.controllers.PerfilController, "create").mockImplementation(() => {
                done();
                throw new Error();
            });
            await request(server)
                .post('/api/perfil/create')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(server.controllers.PerfilController.create).toBeCalledTimes(1);
            done();
        } catch (e) {
            expect(server.interfaces.Response.internalServerError).toBeCalledTimes(1)
        }
    });

    test('/api/perfil/update', async (done) => {
        jest.spyOn(server.security.JWT, 'verifyJWT').mockImplementation((req, res, next) => {
            done()
            next()
        })
        jest.spyOn(server.controllers.PerfilController, "update").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .put('/api/perfil/update')
            .set('x-access-token', '69')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.PerfilController.update).toBeCalledTimes(1);
        done();
    });

    test('/api/perfil/update error', async (done) => {
        jest.setTimeout(30000)
        spyOn(server.interfaces.Response, 'internalServerError');
        try {
            jest.spyOn(server.controllers.PerfilController, "update").mockImplementation(() => {
                done();
                throw new Error();
            });
            await request(server)
                .put('/api/perfil/update')
                .set('x-access-token', '69')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(server.controllers.PerfilController.update).toBeCalledTimes(1);
            done();
        } catch (e) {
            expect(server.interfaces.Response.internalServerError).toBeCalledTimes(1)
        }
    });
});
