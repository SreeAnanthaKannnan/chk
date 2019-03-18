var building = require('../daos/buildingDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
    buildings:buildings
}
function buildings(buildingobject,email_id) {
    logger.fatal(buildingobject,"buildingobject")
   return new Promise(async (resolve, reject) => {
       var responseObj = {};
//passing values to Dao to store the Building details        
       var user = building.building(buildingobject,email_id).then((data) => {
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
   })
}