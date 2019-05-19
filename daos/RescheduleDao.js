/**
 * @author: saned team
 * @version: 1.0.0
 * @date: March 05, 2019
 * @description: This would be the DAO file where all the mysql queries will be executed for result insertion and fetch.
 */
const con = require("../mysql_connection/dbConfig");
const log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

//====Inserting the results in result table====//
async function Reschedule(params) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection.query_execute(
      query.Reschedule
     
    );
  
    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {

      return resolve({
        status: 200,
        message: res.data
      });
    }
  });
}
function building_reschedule(time_slot,reschedule_date,schedule_id){
  return new Promise(async(resolve, reject)=>{
    var status ="assessed"


      var res1 = await mysqlConnection.query_execute(query.building_reschedule, [time_slot,reschedule_date,status,schedule_id])


//=============================================Select Schedules details form Schedules Table================================================================//        
// var sql= "SELECT Schedules.schedule_time,Schedules.status, Buildings.buildingname,Buildings.email_id,Schedules.id,Buildings.address,Buildings.lat,Buildings.lon, Schedules.requestdate FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id where supplier_id="'+ +'";"
// con.query(sql,function(err,result){
  if(res1.data.affectedrows ==0) { logger.fatal("something",err)
      return reject({ "status": 400, "body": 'failed to insert' })}
      else{
            logger.fatal(res1,"result in Daos");
      return resolve({result:res1.data});
      }
  });  
//});
}

module.exports = {
  Reschedule: Reschedule, 
  building_reschedule : building_reschedule 
};