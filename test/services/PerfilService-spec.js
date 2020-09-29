const mongoose = require('mongoose');
const PerfilModel = mongoose.model('perfil');

describe('PerfilService.js Tests', function () {
    let PerfilService, Mock = {};
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
        PerfilService = require("../../app/services/PerfilService")(app);
    });

    test('create success', async (done) => {
        jest.setTimeout(30000);
        mock();
        try {
            jest.spyOn(PerfilModel.prototype, "save").mockImplementation(() => {
                return Promise.resolve(Mock.data);
                done();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await PerfilService.create(Mock.data);
            expect(PerfilModel.prototype.save).toBeCalled()
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
            jest.spyOn(PerfilModel.prototype, "save").mockImplementation(() => {
                throw new Error('test error')
                done();
            });
            let result = await PerfilService.create(null);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(PerfilModel.prototype.save).toBeCalled()
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
            jest.spyOn(PerfilModel, "updateOne").mockImplementation(() => {
                return Promise.resolve(Mock.data);
                done();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await PerfilService.update(Mock.data);
            expect(PerfilModel.updateOne).toBeCalled()
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
            jest.spyOn(PerfilModel, "updateOne").mockImplementation(() => {
                throw new Error('test error')
                done();
            });
            let result = await PerfilService.update(null);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(PerfilModel.updateOne).toBeCalled()
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
