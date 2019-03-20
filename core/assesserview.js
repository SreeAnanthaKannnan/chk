var asser = require('../daos/assesserview');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports = {
    assesserview: assesserview
}
//===============Fetching the details from the Daos both building and schedule information=========================================//
function assesserview() {
    return new Promise(async (resolve, reject) => {
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

    })

}
//===============Code End===============================================================================================================//
