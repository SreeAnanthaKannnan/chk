var updatedao = require('../daos/updatedao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports = {
    update: update
}

function update(installation, token) {
    logger.fatal(installation, "installation")
    return new Promise(async (resolve, reject) => {
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 405) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        } else if (verifytoken.status == 403) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        }
        else {
                var responseObj = {};
                //updatin
                var user = updatedao.updatedao(installation).then((data) => {
                    logger.fatal(user, "user")
                    responseObj.data = data;
                    responseObj.errors = [];
                    responseObj.meta = {};

                    resolve(responseObj);
                }).catch((error) => {
                    responseObj.data = [];
                    responseObj.errors = [error];
                    responseObj.meta = {};
                });
            }
        })
    }
