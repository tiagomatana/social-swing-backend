describe('ProfileController.js Tests', function () {
    let ProfileController;
    let Mock = {};

    let ResponseService = require("../../app/interfaces/Response");
    let Email = require("../../app/interfaces/Email");
    let Enum = require("../../app/interfaces/Enum");

    let ProfileService = require("../../app/services/ProfileService")({

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
                ProfileService: ProfileService
            },
            interfaces: {
                Response: ResponseService,
                Email: Email,
                Enum: Enum
            }
        };
        ProfileController = require("../../app/controllers/ProfileController")(app);
    });

    test('create success', (done) => {
        jest.spyOn(ProfileService, "create");
        let result = ProfileController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(ProfileService.create).toBeCalledWith(Mock.data);
        done();
    });

    test('create notAcceptable', (done) => {
        jest.spyOn(ProfileService, "create");
        jest.spyOn(ResponseService, "notAcceptable");
        Mock.data.nascimento = new Date().toISOString();
        let result = ProfileController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(ProfileService.create).not.toBeCalledWith(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalledTimes(1);
        done();
    });

    test('update success', (done) => {
        jest.spyOn(ProfileService, "update");
        let result = ProfileController.update(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(ProfileService.update).toBeCalledWith(Mock.data);
        done();
    });

    test('update notAcceptable', (done) => {
        jest.spyOn(ProfileService, "update");
        jest.spyOn(ResponseService, "notAcceptable");
        Mock.data.nascimento = new Date().toISOString();
        let result = ProfileController.update(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(ProfileService.update).not.toBeCalledWith(Mock.data);
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
