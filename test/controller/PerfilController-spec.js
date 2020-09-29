describe('PerfilController.js Tests', function () {
    let PerfilController;
    let Mock = {};

    let ResponseService = require("../../app/interfaces/Response");
    let Email = require("../../app/interfaces/Email");
    let Enum = require("../../app/interfaces/Enum");

    let PerfilService = require("../../app/services/PerfilService")({

        interfaces: {
            Response: ResponseService,
            Email: Email,
            Enum: Enum
        }

    });

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        // await mongoose.connection.close()
        done()
    })

    beforeAll((done /* call it or remove it*/) => {
        done(); // calling it
    });

    beforeEach(function () {
        jest.setTimeout(5000);
        mock();
        global.console = {
            log: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            table: jest.fn()
        }
        let app = {
            services: {
                PerfilService: PerfilService
            },
            interfaces: {
                Response: ResponseService,
                Email: Email,
                Enum: Enum
            }
        };
        PerfilController = require("../../app/controllers/PerfilController")(app);
    });

    test('create success', (done) => {
        jest.spyOn(PerfilService, "create");
        let result = PerfilController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(PerfilService.create).toBeCalledWith(Mock.data);
        done();
    });

    test('create notAcceptable', (done) => {
        jest.spyOn(PerfilService, "create");
        jest.spyOn(ResponseService, "notAcceptable");
        Mock.data.nascimento = new Date().toISOString();
        let result = PerfilController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(PerfilService.create).not.toBeCalledWith(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalledTimes(1);
        done();
    });

    test('update success', (done) => {
        jest.spyOn(PerfilService, "update");
        let result = PerfilController.update(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(PerfilService.update).toBeCalledWith(Mock.data);
        done();
    });

    test('update notAcceptable', (done) => {
        jest.spyOn(PerfilService, "update");
        jest.spyOn(ResponseService, "notAcceptable");
        Mock.data.nascimento = new Date().toISOString();
        let result = PerfilController.update(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(PerfilService.update).not.toBeCalledWith(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalledTimes(1);
        done();
    });


    function mock() {
        let nascimento = new Date();
        nascimento.setFullYear(2000, new Date().getMonth(), 28);
        Mock.data = {
            "genero": "masculino",
            "orientacao_sexual": "hererossexual",
            "signo": "aries",
            "estado_civil": "solteiro",
            "nascimento": nascimento.toISOString(),
            "_id": "5e17cab5b613222e9d19a76e"
        };

        Mock.result = {
            "email": "teste@gmail.com",
            "password": "123",
            "secret": "teste",
            "_id": "5e17cab5b613222e9d19a76e"
        };
    }
});
