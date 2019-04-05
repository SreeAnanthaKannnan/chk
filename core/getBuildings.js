var buildings = require('../daos/getBuildingsDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken")
const employee_details = require("../daos/Employee_profileDao");



module.exports = {
    getbuildings: getbuildings,
    getemployees: getemployees
}

function getbuildings(buildingobject, token) {
    logger.fatal(buildingobject, "buildingobject");
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
        //passing values to Dao to store the Building details
        // else {
        var info = [];
        console.log("after");
        var result = await buildings.buildings(buildingobject);
        // var result1 = await buildings.phone(buildingobject);
        console.log("result", result);
        // logger.fatal("result1", result1);
        info.push(result);
        // info.push(result1.result[0].mobile_number);
        resolve({
            status: 200,
            result: info
        })
        //  }

    })
}
function getemployees(employeedetails, token) {
    console.log(employeedetails, "employeedetails");
    return new Promise(async (resolve, reject) => {
        var info = [];
        console.log("after");
        var result = await employee_details.employeedetails(employeedetails);
        // var result1 = await buildings.phone(buildingobject);
        logger.fatal("result", result);
        // logger.fatal("result1", result1);
        info.push(result);
        // info.push(result1.result[0].mobile_number);
        resolve({
            status: 200,
            result: info
        })
        //  }

    })
}