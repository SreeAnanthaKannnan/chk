var building = require('../daos/DeleteBuildingDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
var bc = require('../fabcar/javascript/invoke');
module.exports = {
    buildings: buildings
}

function buildings(buildingobject) {
    logger.fatal(buildingobject, "buildingobject")
    return new Promise(async (resolve, reject) => {
        var responseObj = {};
        // else {
        // var params = {
        //     id : id,
        //     fun:"delete",
        //     data: buildingobject 
        // }
        //   bcSdk.updatetransaction({ updatedetails: userdetails})
        //  bc.main(params)
        var user = building.delbuilding(buildingobject).then((data) => {
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
        // }
        //}
    })
}
//=======================================code End==============================================================//        