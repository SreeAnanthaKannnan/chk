var buildings = require('../daos/getBuildingsDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken")

module.exports = {
    getbuildings: getbuildings
}

function getbuildings(buildingobject, token) {
    // logger.fatal(buildingobject,"buildingobject");
    return new Promise(async (resolve, reject) => {
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 402) {
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
            var result = await buildings.phone(buildingobject);
            if (result.result.length >= 1) {
                resolve({
                    status: 200,
                    result: result.result
                })
            } else {
                reject({
                    status: 400,
                    result: "user not yet registered"
                })
            }
        }

    })
}