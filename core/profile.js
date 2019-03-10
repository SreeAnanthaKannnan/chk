var buildings = require('../daos/getBuildingsDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
  getbuildings:getbuildings
}
function getbuildings(buildingobject) {
 // logger.fatal(buildingobject,"buildingobject");
 return new Promise(async (resolve, reject) => {
    
     var result = await buildings.phone(buildingobject);
     if(result.result.length>=1){
resolve({
        status:200,
        result:result.result
     })
    }
    else{
        reject({
            status:400,
            result:"user not yet registered"
        })
    }
 })
}