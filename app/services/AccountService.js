const mongoose = require("mongoose");
const accountModel = mongoose.model('account');

/** @namespace application.app.services.AccountService **/
module.exports = function (app) {
    const Response = app.interfaces.Response;
    return {
        async create(data) {
            try {
                const accountFound = await this.getAccount(data.email);
                if (accountFound) {
                    return Response.notAcceptable();
                } else {
                    let account = new accountModel(data);

                    await account.save();
                    return Response.success(account._id);
                }
            } catch (err) {
                return Response.internalServerError(err);
            }
        },
        async update(data) {
            try {
                if (!data._id) {
                    return Response.notAcceptable();
                } else {
                    let template = new accountModel(data);
                    await accountModel.updateOne({_id: template._id}, template, {upsert : false });
                    return Response.success(true);
                }
            } catch (err) {
                return Response.internalServerError(err);
            }
        },
        async getAccount(email , full = 0) {
            try {
                const project = {password: 0}
                let result = await accountModel.findOne({email}, project);
                if (result) {
                    return result.toBSON();
                } else {
                    return null;
                }
            } catch (err) {
                return Response.internalServerError(err);
            }
        }
    }

};
