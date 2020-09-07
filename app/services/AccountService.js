const mongoose = require("mongoose");
const accountModel = mongoose.model('account');

/** @namespace application.app.services.AccountService **/
module.exports = function (app){
    const Response = app.interfaces.Response;
    return {
        async create(data) {
            return new Promise(async (resolve, reject) => {
                try {
                    const accountFound = await this.getAccount(data.email);
                    if (accountFound) {
                        resolve(Response.notAcceptable());
                    }else {
                        let account = new accountModel(data);
                        await account.save();
                        resolve(Response.success(account._id));
                    }
                } catch (err) {
                    reject(Response.internalServerError(err));
                }
            });
        },
        async getAccount(email) {
            return new Promise( async (resolve, reject) => {
                try {
                    let result = await accountModel.findOne({email});
                    if (result){
                        resolve(result.toBSON());
                    } else {
                        resolve(null);
                    }
                } catch (err) {
                    reject(Response.internalServerError(err));
                }
            })
        }
    }

};
