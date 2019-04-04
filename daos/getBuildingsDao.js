const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

//Here we fetch the Building details of the user
function buildings(buildingobject) {
  return new Promise((resolve, reject) => {
 
    var sql = "SELECT DISTINCT orderid,datecreated,paymenttype,trnx,Amount,status FROM Buildings where (lower(trim(orderid)) !='nointerest') AND (lower(trim(orderid))!='null') AND email_id= '" + buildingobject + "'"
    // var sql = "SELECT distinct CONCAT(c.firstname_en ,' ', c.lastname_en) AS name_en, b.paymenttype, b.Amount, b.status, b.trnx, b.datecreated, b.orderid FROM Buildings b inner join citizens c ON b.email_id=c.email_id WHERE email_id = ?;"
    con.query(sql,function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:", err)
      logger.fatal(result, "inserted.......")
      resolve({
        Message: "get Buildings done",
        result: result
      })
    })
    // mysqlConnection
    //     .query_execute(query.getbuildings,buildingobject)
    //     .then(function (result, err) {
          
    //         if (err) {
    //             logger.fatal("something", err)
    //             return reject({ "status": 400, "body": 'Cannot insert the data' })
    //         }
    //         else {
    //             console.log(result, "achieved")
    //             return resolve({ status:200, result:result.data});
    //         }
    //     })
  })
}

//Here we get the mobile number of citizens from citizen table
// function phone(){
//   return new Promise((resolve, reject)=>{
//      // logger.fatal(buildingobject,"=>buildingobject");
//        var sql = "SELECT * FROM citizens";
//       con.query(sql, function (err, result) {
//       if (err) throw err;
//       dbFunc.connectionRelease;
//       resolve({
//           Message: "get phone number",
//            result:result
//         })
//       })
//   })
// }
// function date(){
//   return new Promise((resolve, reject)=>{
//      // logger.fatal(buildingobject,"=>buildingobject");
//        var sql = "SELECT * FROM Schedules";
//       con.query(sql, function (err, result) {
//       if (err) throw err;
//       dbFunc.connectionRelease;
//       resolve({
//           Message: "get date",
//            result:result
//         })
//       })
//   })
// }

module.exports = {
  buildings: buildings,
  //  phone:phone,
  //  date:date
}