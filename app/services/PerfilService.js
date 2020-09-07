const mongoose = require("mongoose");
const perfilModel = mongoose.model('perfil');

/** @namespace application.app.services.PerfilService **/
module.exports = function (app) {
    const Response = app.interfaces.Response;
    return {
        async create(data) {
            try {
                let perfil = new perfilModel(data);
                await perfil.save();
                return Response.success(perfil);

            } catch (err) {
                return Response.internalServerError(err);
            }
        },
        async update(data) {
            try {
                let template = new perfilModel(data);
                let filter = {'_id': template._id}
                let perfil = await perfilModel.findOneAndUpdate(filter, template, {
                    new: true
                });
                return Response.success(perfil);

            } catch (err) {
                return Response.internalServerError(err);
            }
        }
    }

};
