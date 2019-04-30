const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');

//Here we fetch the Building details of the user
function buildings(buildingobject) {
  return new Promise((resolve, reject) => {
 
    mysqlConnection
        .query_execute(query.getbuildings,buildingobject)
        .then(function (result, err) {
          
            if (err) {
              logger.fatal(err,"db error while getting distinct orderid for the buildings in the building table")
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achieved")
                return resolve({ status:200, result:result.data});
            }
        })
  })
}
function phone(buildingobject) {
  return new Promise((resolve, reject) => {
 
    mysqlConnection
        .query_execute(query.profile,buildingobject)
        .then(function (result, err) {
          
            if (err) {
              logger.fatal(err,"db error while getting distinct orderid for the buildings in the building table")
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achieved")
                return resolve({ status:200, result:result.data});
            }
        })
  })
}
module.exports = {
  buildings: buildings,
    phone:phone,
  //  date:date
}