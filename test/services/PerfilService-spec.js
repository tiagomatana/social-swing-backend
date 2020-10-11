const mongoose = require('mongoose');
const ProfileModel = mongoose.model('profile');

describe('ProfileService.js Tests', function () {
    let ProfileService, Mock = {};
    let ResponseService = require("../../app/interfaces/Response");

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        // await mongoose.connection.close()
        done()
    })

    beforeEach(function () {
        mock();
        let app = {
            interfaces: {
                Response: ResponseService
            }
        };
        ProfileService = require("../../app/services/ProfileService")(app);
    });

    test('create success', async (done) => {
        jest.setTimeout(30000);
        mock();
        try {
            jest.spyOn(ProfileModel.prototype, "save").mockImplementation(() => {
                return Promise.resolve(Mock.data);
                done();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await ProfileService.create(Mock.data);
            expect(ProfileModel.prototype.save).toBeCalled()
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('create internalServerError', async (done) => {
        jest.setTimeout(30000);
        try {
            jest.spyOn(ResponseService, 'internalServerError');
            jest.spyOn(ProfileModel.prototype, "save").mockImplementation(() => {
                throw new Error('test error')
                done();
            });
            let result = await ProfileService.create(null);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(ProfileModel.prototype.save).toBeCalled()
            expect(ResponseService.internalServerError).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update success', async (done) => {
        jest.setTimeout(30000);
        mock();
        try {
            jest.spyOn(ProfileModel, "updateOne").mockImplementation(() => {
                return Promise.resolve(Mock.data);
                done();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await ProfileService.update(Mock.data);
            expect(ProfileModel.updateOne).toBeCalled()
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update internalServerError', async (done) => {
        jest.setTimeout(30000);
        try {
            jest.spyOn(ResponseService, 'internalServerError');
            jest.spyOn(ProfileModel, "updateOne").mockImplementation(() => {
                throw new Error('test error')
                done();
            });
            let result = await ProfileService.update(null);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(ProfileModel.updateOne).toBeCalled()
            expect(ResponseService.internalServerError).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    function mock() {
        let nascimento = new Date();
        nascimento.setFullYear(2000, new Date().getMonth(), 28);
        Mock.data = {
            "nome": "teste",
            "genero": "masculino",
            "orientacao_sexual": "hererossexual",
            "signo": "aries",
            "estado_civil": "solteiro",
            "nascimento": nascimento.toISOString(),
            "_id": "5e17cab5b613222e9d19a76e"
        };
    }

});
