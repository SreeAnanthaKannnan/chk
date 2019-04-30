var updateProfile = require('../daos/updateProfileDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
var bc = require('../fabcar/javascript/invoke');
module.exports = {
    updateprofile: updateprofile
  
}

function updateprofile(updateProf) {
    logger.fatal(updateProf, "updateProf")
    return new Promise(async (resolve, reject) => {
        var responseObj = {};
  
        var user = updateProfile.updateprofile(updateProf).then((data) => {
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
