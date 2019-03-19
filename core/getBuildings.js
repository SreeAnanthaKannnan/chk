var buildings = require('../daos/getBuildingsDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
module.exports={
  getbuildings:getbuildings
}
function getbuildings(buildingobject,token) {
  logger.fatal(buildingobject,"buildingobject");
 return new Promise(async (resolve, reject) => {
  let query = await SessionDao.Session_select(token)
  console.log(query, "token")
  if (query.length == 0) {
      resolve({
          status: 402,
          message: "Invalid token"
      })
  } else {
      /*===================session validation=======================*/
      console.log(query[0].session_created_at)
      let Name_ar, Name_en, query_value
      let now = new Date();
      let Db_time = query[0].session_created_at;
      let time_difference_minutes = await session_time.Session_time_difference(Db_time, now)
      console.log(time_difference_minutes, "function")

      console.log(time_difference_minutes <= "01:00", "session durationchecking")


      if (time_difference_minutes <= "01:00") {
          return resolve({
              status: 440,
              message: "session expired"
          })
      } else { 
     var info=[];
     var result = await buildings.buildings(buildingobject);
     var result1 = await buildings.phone(buildingobject);
     logger.fatal("result",result);
     logger.fatal("result1",result1);
     info.push(result);
     info.push(result1.result[0].mobile_number);
     resolve({
        status:200,
        result:info
     })
    }
  }
 })
}
