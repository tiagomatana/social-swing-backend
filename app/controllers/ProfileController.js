const jwt = require('jsonwebtoken');

/** @namespace application.app.controllers.ProfileController**/
module.exports = function (app) {
    const profileService = app.services.ProfileService;
    const Response = app.interfaces.Response;
    const Enum = app.interfaces.Enum;

    function validateData(profile) {
        profile.genero = Enum.GENERO.value.find(genero => { return genero === profile.genero});
        profile.orientacao_sexual = Enum.ORIENTACAO.value.find(orientacao => { return orientacao === profile.orientacao_sexual});
        profile.signo = Enum.SIGNO.value.find(signo => { return signo === profile.signo});
        profile.estado_civil = Enum.SIGNO.value.find(estado_civil => { return estado_civil === profile.estado_civil});
        return profile;
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
                let profile = data;
                profile.nascimento = new Date(data.nascimento);
                profile = validateData(profile);
                return profileService.create(profile);
            } else {
                return Response.notAcceptable();
            }
        },
        async update(data) {
            if (is18(data.nascimento)) {
                const profile = data;
                profile.nascimento = new Date(data.nascimento);
                return profileService.update(validateData(profile));
            } else {
                return Response.notAcceptable();
            }
        }
    }
}
