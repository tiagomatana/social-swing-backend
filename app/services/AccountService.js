const mongoose = require("mongoose");
const accountModel = mongoose.model('account');

/** @namespace application.app.services.AccountService **/
module.exports = function (app) {
    const Response = app.interfaces.Response;
    return {
        async create(data) {
            try {
                const accountFound = await this.getAccount({email: data.email});
                if (accountFound) {
                    return Response.notAcceptable();
                } else {
                    let account = new accountModel(data);

                    await account.save();
                    return account.toBSON();
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
        async getAccount(filter) {
            try {
                let result = await accountModel.findOne(filter);
                if (result) {
                    return result.toBSON();
                } else {
                    return null;
                }
            } catch (err) {
                return Response.internalServerError(err);
            }
        },
        async disable(email){
          try {
              let result = await accountModel.updateOne({email}, {active: false});
              if (result){
                  return Response.success(result);
              } else {
                  return Response.notAcceptable(result)
              }
          } catch (err) {
              return Response.internalServerError(err);
          }
        },
        async deleteAccount(_id) {
            try {
                await accountModel.deleteOne({_id}, function (err) {
                    if (err) {
                        return false;
                    } else {
                        return true;
                    }
                });
            } catch (err) {
                return Response.internalServerError(err);
            }
        }
    }

};
