describe('Logger.js Tests', function () {
    var app, assert;

    beforeEach(function () {
        app = require("../../app/interfaces/Logger.js");
        assert = require('assert');
        global.console = {
            log: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            table: jest.fn()
        }
    });

    it('should error message', function () {
        let msg = 'test msg error';
        app.error(msg);
        expect(console.error).toBeCalled();
        expect(console.error.mock.calls[0][0]).toMatch(/test msg error/);
    });

    it('should info message', function () {
        let msg = 'test msg info';
        app.info(msg);
        expect(console.info).toBeCalled();
        expect(console.info.mock.calls[0][0]).toMatch(/test msg info/);
    });

    it('should debug message', function () {
        let msg = 'test msg debug';
        app.debug(msg);
        expect(console.debug).toBeCalled();
        expect(console.debug.mock.calls[0][0]).toMatch(/test msg debug/);
    });

    it('should log message', function () {
        let msg = 'test msg log';
        app.log(msg);
        expect(console.log).toBeCalled();
        expect(console.log.mock.calls[0][0]).toMatch(/test msg log/);
    });

    it('should warn message', function () {
        let msg = 'test msg warn';
        app.warn(msg);
        expect(console.warn).toBeCalled();
        expect(console.warn.mock.calls[0][0]).toMatch(/test msg warn/);
    });

    it('should table message', function () {
        let msg = 'test msg table';
        app.table(msg);
        expect(console.table).toBeCalled();
        expect(console.table.mock.calls[0][0]).toMatch(/test msg table/);
    });

});
