/**
 * @author: Manoj V
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

module.exports = {
  Reschedule: Reschedule,  
};