describe('AccountController.js Tests', function () {
    let AccountController;
    let Mock = {};

    let ResponseService = require("../../app/interfaces/Response");
    let Email = require("../../app/interfaces/Email");
    let bcrypt = require('bcrypt')

    let AccountService = require("../../app/services/AccountService")({

        interfaces: {
            Response: ResponseService,
            Email: Email,
            Enum: {
                ADMINISTRATOR: 'administrador'
            }
        }

    });

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
                AccountService: AccountService
            },
            interfaces: {
                Response: ResponseService,
                Email: Email,
                Enum: {
                    ADMINISTRATOR: 'administrador'
                }
            }
        };
        AccountController = require("../../app/controllers/AccountController")(app);
    });

    test('create success', (done) => {
        jest.spyOn(AccountService, "create");
        let result = AccountController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(AccountService.create).toBeCalledWith(Mock.data);
        done();
    });

    test('create failed', (done) => {
        jest.spyOn(AccountService, "create");
        jest.spyOn(ResponseService, "notAcceptable");
        Mock.data.email = expect.anything();
        let result = AccountController.create(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(AccountService.create).not.toBeCalledWith(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalled();
        done();
    });

    test('create admin success', (done) => {
        jest.spyOn(AccountService, "create");
        process.env.SECRET = "teste";
        let result = AccountController.createAdmin(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(AccountService.create).toBeCalledWith(Mock.data);
        done();
    });

    test('create admin failed', (done) => {
        jest.spyOn(AccountService, "create");
        jest.spyOn(ResponseService, "notAcceptable");
        process.env.SECRET = "outro teste";
        let result = AccountController.createAdmin(Mock.data);
        expect(result).toEqual(Promise.resolve({}));
        expect(AccountService.create).not.toBeCalledWith(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalled();
        done();
    });

    test('authenticate success', async (done) => {
        mock()
        process.env.SECRET = 'test'
        Mock.result.password = bcrypt.hashSync(Mock.data.password,bcrypt.genSaltSync(10));
        jest.spyOn(ResponseService, "success");
        jest.spyOn(AccountService, "update").mockImplementation(() => {return Mock.result});
        jest.spyOn(AccountService, "getAccount").mockImplementation(() => {return Mock.result});
        let result = await AccountController.authenticate(Mock.data);
        expect(ResponseService.success).toBeCalled();
        done();
    });

    test('authenticate failed email', async (done) => {
        mock()
        Mock.data.email = 'email';
        jest.spyOn(ResponseService, "notAcceptable");
        let result = await AccountController.authenticate(Mock.data);
        expect(ResponseService.notAcceptable).toBeCalled();
        done();
    });

    test('authenticate not found', async (done) => {
        mock()
        Mock.result.password = bcrypt.hashSync(Mock.data.password,bcrypt.genSaltSync(10));
        jest.spyOn(ResponseService, "unauthorized");
        jest.spyOn(AccountService, "getAccount").mockImplementation(() => {return null});
        let result = await AccountController.authenticate(Mock.data);
        expect(ResponseService.unauthorized).toBeCalled();
        done();
    });

    test('authenticate failed password', async (done) => {
        mock()
        Mock.result.password = bcrypt.hashSync("teste",bcrypt.genSaltSync(10));
        jest.spyOn(ResponseService, "unauthorized");
        jest.spyOn(AccountService, "getAccount").mockImplementation(() => {return Mock.result});
        let result = await AccountController.authenticate(Mock.data);
        expect(ResponseService.unauthorized).toBeCalled();
        done();
    });

    test('logout', async (done) =>{
        jest.spyOn(ResponseService, 'success');
        expect(await AccountController.logout()).toEqual({body: {data: {auth: false, token: null}},code: 200});
        expect(ResponseService.success).toBeCalled();
        done()
    })

    function mock() {
        Mock.data = {
            "email": "teste@gmail.com",
            "password": "123",
            "secret": "teste",
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
