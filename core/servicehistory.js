var asser = require('../daos/servicehistory');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const checktoken = require("../utils/checkToken")
module.exports = {
    bookservice: bookservice
}

function bookservice(email_id, token) {
    return new Promise(async (resolve, reject) => {
        //Fetching the Data from Dao by passing the email of the User
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
                var result = await asser.historyget(email_id)
                logger.fatal("result in core", result)
                if (result) {
                    resolve({
                        status: 200,
                        result: result
                    })
                }
                reject({
                    message: "no requests available"
                })
            }
        

    })
}
//==============================================================Code End==============================================================================//