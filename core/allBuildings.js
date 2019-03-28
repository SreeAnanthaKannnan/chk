// var buildings = require('../daos/getBuildingsDao.js');
var buildings = require('../daos/allBuildings.js');

var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken")

module.exports = {
    getbuildings: getbuildings
}

function getbuildings() {

    return new Promise(async (resolve, reject) => {

        var result = await buildings.buildings();
        console.log("add", result);
        resolve({
            status: 200,
            result: result,

        })


    })
}