var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
//Here we get the installers details from the DataBase
async function supplier(){
  return new Promise((resolve, reject)=>{
      var sql = "SELECT email_id FROM admin";
        con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      logger.fatal(result,"inserted.......")
     resolve({
          Message: "get suppliers list done",
           result:result
        })
      })
  })
}
module.exports={
 supplier:supplier

}