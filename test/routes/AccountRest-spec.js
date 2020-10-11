const request = require('supertest');
const server = require('../../app/server');

describe('AccountRest.js Tests', () => {

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        // await mongoose.connection.close()
        done()
    })

    test('/api/user/create', async () => {
        jest.spyOn(server.controllers.AccountController, "create").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .post('/api/user/create')
            .expect('Content-Type', /json/)
            .set('Host', 'localhost')
            .set('Headers', {'host': 'localhost'})
            .expect(200);
        expect(server.controllers.AccountController.create).toBeCalledTimes(1);
    });

    test('/api/user/create error', async (done) => {
        jest.setTimeout(30000)
        jest.spyOn(server.controllers.AccountController, "create").mockImplementation(() => {
            throw new Error();
            done();
        });
        await request(server)
            .post('/api/user/create')
            .set('Host', 'localhost')
            .set('Headers', {'host': 'localhost'})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(server.controllers.AccountController.create).toBeCalledTimes(1);
        done();
    });

    test('/api/user/login', async () => {
        jest.spyOn(server.controllers.AccountController, "authenticate").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .post('/api/user/login')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.AccountController.authenticate).toBeCalledTimes(1);
    });

    test('/api/user/login error', async (done) => {
        jest.setTimeout(30000)
        jest.spyOn(server.controllers.AccountController, "authenticate").mockImplementation(() => {
            done();
            throw new Error();
        });
        await request(server)
            .post('/api/user/login')
            .expect('Content-Type', /json/)
            .expect(500);

        expect(server.controllers.AccountController.authenticate).toBeCalledTimes(1);
        done();
    });

    test('/api/user/logout', async () => {
        jest.spyOn(server.controllers.AccountController, "logout").mockImplementation(() => {
            return Promise.resolve({code: 200, body: {}})
        });
        await request(server)
            .post('/api/user/logout')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(server.controllers.AccountController.logout).toBeCalledTimes(1);
    });

    test('/api/user/login error', async (done) => {
        jest.setTimeout(30000)
        jest.spyOn(server.controllers.AccountController, "logout").mockImplementation(() => {
            done();
            throw new Error();
        });
        await request(server)
            .post('/api/user/logout')
            .expect('Content-Type', /json/)
            .expect(500);

        expect(server.controllers.AccountController.logout).toBeCalledTimes(1);
        done();
    });
});
