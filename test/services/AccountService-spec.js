const mongoose = require('mongoose');
const AccountModel = mongoose.model('account');

describe('AccountService.js Tests', function () {
    let AccountService;
    let ResponseService = require("../../app/interfaces/Response");

    beforeEach(function () {
        let app = {
            interfaces: {
                Response: ResponseService
            }
        };
        AccountService = require("../../app/services/AccountService")(app);
    });

    test('create success', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template"
        };
        try {
            jest.spyOn(AccountService, 'getAccount').mockImplementation(() => {
                return Promise.resolve(null);
            })
            jest.spyOn(AccountModel.prototype, "save").mockImplementation(() => {
                return Promise.resolve({_id: 'abc123'});
            });
            jest.spyOn(ResponseService, 'success');

            let result = await AccountService.create(account);
            expect(result).toEqual({
                "body": {
                    "data": true
                },
                "code": 200
            });
            expect(AccountModel.prototype.save).toBeCalled()
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('create not acceptable', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template"
        };
        try {
            jest.spyOn(AccountService, 'getAccount').mockImplementation(() => {
                return Promise.resolve(account);
            });
            jest.spyOn(ResponseService, 'notAcceptable');

            let result = await AccountService.create(account);
            expect(result).toEqual({
                "body": {
                    "data": {
                        "message": "Value not acceptable"
                    }
                },
                "code": 406
            });
            expect(AccountModel.prototype.save).not.toBeCalled()
            expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('create internalServerError', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template"
        };
        try {
            jest.spyOn(AccountService, 'getAccount').mockImplementation(() => {
                throw new Error('test error');
            });
            jest.spyOn(ResponseService, 'internalServerError');

            let result = await AccountService.create(account);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(AccountModel.prototype.save).not.toBeCalled()
            expect(ResponseService.internalServerError).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('getAccount success', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template",
            "toBSON": () => {
                return account;
            }
        };
        try {
            jest.spyOn(AccountModel, 'findOne').mockImplementation(() => {
                return Promise.resolve(account)
            });
            jest.spyOn(account, 'toBSON');

            let result = await AccountService.getAccount(account);
            expect(account.toBSON).toHaveBeenCalledTimes(1);
            expect(result).toEqual(account);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('getAccount null', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template",
            "toBSON": () => {
                return account;
            }
        };
        try {
            jest.spyOn(AccountModel, 'findOne').mockImplementation(() => {
                return Promise.resolve(null)
            });
            jest.spyOn(account, 'toBSON');

            let result = await AccountService.getAccount(account);
            expect(account.toBSON).toHaveBeenCalledTimes(0);
            expect(result).toEqual(null);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('getAccount internalServerError', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "email": "name@email.com",
            "password": "template",
            "toBSON": () => {
                return account;
            }
        };
        try {
            jest.spyOn(AccountModel, 'findOne').mockImplementation(() => {
                throw new Error('test error');
            });
            jest.spyOn(account, 'toBSON');
            jest.spyOn(ResponseService, 'internalServerError');

            let result = await AccountService.getAccount(account, 1);
            expect(account.toBSON).toHaveBeenCalledTimes(0);
            expect(ResponseService.internalServerError).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update success', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "_id": "5e17cab5b613222e9d19a76e",
            "active": true,
            "bloquear": false,
            "email": "name@email.com",
            "password": "template",
            "excluir": false,
            "is_administrador": false,
            "nivel": "usuario",
            "status": "ativo"
        };

        try {
            jest.spyOn(AccountModel, "updateOne").mockImplementation(() => {
                Promise.resolve(account);
                done();
            });
            jest.spyOn(ResponseService, 'success');

            let result = await AccountService.update(account);
            expect(result).toEqual({
                "body": {
                    "data": true
                },
                "code": 200
            });
            expect(AccountModel.updateOne).toBeCalled()
            expect(ResponseService.success).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update notAcceptable', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "active": true,
            "bloquear": false,
            "email": "name@email.com",
            "password": "template",
            "excluir": false,
            "is_administrador": false,
            "nivel": "usuario",
            "status": "ativo"
        };

        try {
            jest.spyOn(AccountModel, "updateOne").mockImplementation(() => {
                Promise.resolve(account);
                done();
            });
            jest.spyOn(ResponseService, 'notAcceptable');

            let result = await AccountService.update(account);
            expect(result).toEqual({
                "body": {
                    "data": {
                        "message": "Value not acceptable"
                    }
                },
                "code": 406
            });
            expect(AccountModel.updateOne).not.toBeCalled()
            expect(ResponseService.notAcceptable).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });

    test('update internalServerError', async (done) => {
        jest.setTimeout(30000);
        let account = {
            "_id": "5e17cab5b613222e9d19a76e",
            "active": true,
            "bloquear": false,
            "email": "name@email.com",
            "password": "template",
            "excluir": false,
            "is_administrador": false,
            "nivel": "usuario",
            "status": "ativo"
        };

        try {
            jest.spyOn(AccountModel, "updateOne").mockImplementation(() => {
                throw new Error('test error')
                done();
            });
            jest.spyOn(ResponseService, 'internalServerError');

            let result = await AccountService.update(account);
            expect(result).toEqual({
                "body": {
                    "data": new Error('test error')
                },
                "code": 500
            });
            expect(AccountModel.updateOne).toBeCalled()
            expect(ResponseService.internalServerError).toHaveBeenCalledTimes(1);
            done()
        } catch (err) {
            expect(err).toBe(false)
        }
    });


});
