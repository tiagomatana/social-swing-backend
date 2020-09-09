const jwt = require('jsonwebtoken');

/** @namespace application.app.controllers.PerfilController**/
module.exports = function (app) {
    const perfilService = app.services.PerfilService;
    const Response = app.interfaces.Response;
    const Enum = app.interfaces.Enum;

    function validateData(perfil) {
        perfil.genero = Enum.GENERO.value.find(genero => { return genero === perfil.genero});
        perfil.orientacao_sexual = Enum.ORIENTACAO.value.find(orientacao => { return orientacao === perfil.orientacao_sexual});
        perfil.signo = Enum.SIGNO.value.find(signo => { return signo === perfil.signo});
        perfil.estado_civil = Enum.SIGNO.value.find(estado_civil => { return estado_civil === perfil.estado_civil});
        return perfil;
    }

    function is18(nascimento) {
        nascimento = new Date(nascimento);
        const today = new Date();
        let years = today.getFullYear() - nascimento.getFullYear();
        const month = today.getMonth() - nascimento.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < nascimento.getDate())) {
            years--;
        }

        return years >= 18;
    }

    return {
        async create(data) {
            if (is18(data.nascimento)) {
                let perfil = data;
                perfil.nascimento = new Date(data.nascimento);
                perfil = validateData(perfil);
                return perfilService.create(perfil);
            } else {
                return Response.notAcceptable();
            }
        },
        async update(data) {
            if (is18(data.nascimento)) {
                const perfil = data;
                perfil.nascimento = new Date(data.nascimento);
                return perfilService.update(validateData(perfil));
            } else {
                return Response.notAcceptable();
            }
        }
    }
}
