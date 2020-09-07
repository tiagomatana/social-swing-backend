describe("Enum.js Tests", function () {
    var app, assert, signos, civil, genero, orientacao, tipo_conta;

    beforeEach(function () {
        app = require("../../app/interfaces/Enum.js");
        assert = require("assert");
        signos = ["aries", "touro", "gemeos", "cancer", "leao", "virgem", "libra", "escorpiao", "sagitario", "capricornio", "aquario", "peixes"];
        civil = ["solteiro", "casado", "relacionamento_aberto", "divorciado", "viuvo", "separado", "companheiro"];
        genero = ['masculino', 'feminino'];
        orientacao = ['heterossexual', 'homossexual', 'bissexual', 'transexual', 'outro'];
        tipo_conta = ['homem', 'mulher', 'homem_mulher', 'mulher_mulher', 'homem_homem', 'transex'];
    });

    it("should success validade", function () {
        assert.equal(app.ADMINISTRATOR.value, "administrador");
        assert.equal(app.USER.value, "usuario");
        expect(app.SIGNO.value).toEqual(signos);
        expect(app.CIVIL.value).toEqual(civil);
        expect(app.GENERO.value).toEqual(genero);
        expect(app.ORIENTACAO.value).toEqual(orientacao);
        expect(app.TIPO_CONTA.value).toEqual(tipo_conta);
    });


});
