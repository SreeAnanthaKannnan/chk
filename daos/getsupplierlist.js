const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');

//Here we get the installers details from the DataBase
async function supplier(){
  return new Promise((resolve, reject)=>{
    var value="installer"

 // var sql = "SELECT email_id FROM citizens where user_type=";
      mysqlConnection
      .query_execute(query.getinstallers,value)
      .then(function (result, err) {
        
          if (err) {
              logger.fatal("something", err)
              return reject({ "status": 400, "body": 'Cannot insert the data' })
          }
          else {
              console.log(result, "achieved")
              return resolve({ status:200, result:result.data});
          }
      })
  })
}
module.exports={
 supplier:supplier

}