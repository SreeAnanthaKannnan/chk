var buildings = require('../daos/getBuildingsDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports = {
    getbuildings: getbuildings
}

//=================================Fetching Building Details from Daos===================================================================//

function getbuildings(buildingobject) {
    logger.fatal(buildingobject, "buildingobject");
    return new Promise(async (resolve, reject) => {
        var info = [];
        var result = await buildings.buildings(buildingobject);
        var result1 = await buildings.phone(buildingobject);
        logger.fatal("result", result);
        logger.fatal("result1", result1);
        info.push(result);
        info.push(result1.result[0].mobile_number);
        resolve({
            status: 200,
            result: info
        })
    })
}
//=================================code End===================================================================//