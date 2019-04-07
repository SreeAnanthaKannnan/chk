var buildings = require('../daos/getBuildings_webDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const checktoken = require("../utils/checkToken")

module.exports = {
    getbuildings: getbuildings
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
        // passing values to Dao to store the Building details
        else {
            var info = [];
            console.log("after");

            var result = await buildings.buildings(buildingobject);
            // console.log()
            // var first = address.split("||")
            console.log(result, "result in 34")
            //console.log(length,"result in 35")
            // var result1 = await buildings.phone(buildingobject);
            for (var i = 0; i < result.result.length; i++) {
                console.log("in loop");
                var first = result.result[i].address.split("||");
                var Building_No = first[0];
                console.log(Building_No)
                result.result[i].Building_No = Building_No;
                var Building_street = first[1]
                console.log(Building_street);
                result.result[i].Building_street = Building_street;
                var Building_plot = first[2];
                result.result[i].Building_plot = Building_plot;
                delete result.result[i]["address"];
            }
            console.log("result", result);

            // logger.fatal("result1", result1);
            info.push(result);
        }
        // info.push(result1.result[0].mobile_number);
        resolve({
            status: 200,
            result: info
        })


    })
}