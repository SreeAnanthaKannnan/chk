// var buildings = require('../daos/getBuildingsDao.js');
var buildings = require('../daos/allBuildings.js');

var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken")

module.exports = {
    getbuildings: getbuildings
}

function getbuildings(token) {

    return new Promise(async (resolve, reject) => {
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 405) {
            console.log("core")
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
        else{
        var result = await buildings.buildings();
        console.log("add", result);
        resolve({
            status: 200,
            result: result,

        })
    }

    })
}