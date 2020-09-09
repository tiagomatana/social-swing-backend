describe('Email.js Tests', function () {
    var app, assert;

    beforeEach(function () {
        app = require("../../app/interfaces/Email.js");
        assert = require('assert');
    });

    it('should success validade', function () {
        let valueCustom = app.validate('teste@email.com');
        assert.equal(valueCustom, true);

        valueCustom = app.validate('teste@email.com.br');
        assert.equal(valueCustom, true);
    });

    it('should failed validade', function () {
        let valueCustom = app.validate('teste@email');
        assert.equal(valueCustom, false);

        valueCustom = app.validate('email');
        assert.equal(valueCustom, false);
    });

});
