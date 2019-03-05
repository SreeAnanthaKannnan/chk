const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
async function historyget(email_id){
  return new Promise((resolve, reject)=>{
      var sql = "SELECT * FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Buildings.email_id='" + email_id + "'";
      // AND Buildings.id=Schedules.building_id";
        con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      logger.fatal(result,"inserted.......")
     resolve({
          Message: "history sent",
           result:result
        })
      })
  })
}
module.exports={
 historyget:historyget
}