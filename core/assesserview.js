var asser = require('../daos/assesserview');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const checktoken = require("../utils/checkToken")
module.exports = {
    assesserview: assesserview
}
//===============Fetching the details from the Daos both building and schedule information=========================================//
function assesserview(token) {
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
        } else {
            var result = await asser.assement_get()
            logger.fatal("result in core file", result)
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
//===============Code End===============================================================================================================//