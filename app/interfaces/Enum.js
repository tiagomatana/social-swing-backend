var Enum = require('enum');
/** @namespace application.app.interfaces.Enum **/
module.exports = new Enum({
    'ADMINISTRATOR': 'administrador',
    'USER': 'usuario',
    'SIGNO': ['aries', 'touro', 'gemeos', 'cancer', 'leao', 'virgem', 'libra', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes'],
    'CIVIL': ['solteiro', 'casado', 'relacionamento_aberto', 'divorciado', 'viuvo', 'separado', 'companheiro'],
    'GENERO': ['masculino', 'feminino'],
    'ORIENTACAO': ['heterossexual', 'homossexual', 'bissexual', 'transexual', 'outro'],
    'TIPO_CONTA': ['homem', 'mulher', 'homem_mulher', 'mulher_mulher', 'homem_homem', 'transex']

});
