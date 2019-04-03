var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

//Here we fetch the Building details of the user
function buildings() {
    return new Promise((resolve, reject) => {
        // logger.fatal(buildingobject,"=>buildingobject");
        var sql = "SELECT  * FROM Buildings INNER JOIN citizens ON citizens.email_id=Buildings.email_id INNER JOIN Schedules ON Schedules.building_id=Buildings.id";
        con.query(sql, function (err, result) {
            if (err) throw err;
            dbFunc.connectionRelease;
            logger.fatal("DataBase ERR:", err)
            logger.fatal(result, "inserted.......")
            resolve({
                Message: "get Buildings done",
                result: result
            })
        })
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