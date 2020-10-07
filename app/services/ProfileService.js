const mongoose = require("mongoose");
const profileModel = mongoose.model('profile');

/** @namespace application.app.services.ProfileService **/
module.exports = function (app) {
    const Response = app.interfaces.Response;
    return {
        async create(data) {
            try {
                let profile = new profileModel(data);
                await profile.save();
                return Response.success(profile);

            } catch (err) {
                return Response.internalServerError(err);
            }
        },
        async update(data) {
            try {
                let template = new profileModel(data);
                let filter = {'_id': template._id}
                await profileModel.updateOne(filter, template, {upsert : false });
                return Response.success();

            } catch (err) {
                return Response.internalServerError(err);
            }
        }
    }

};
