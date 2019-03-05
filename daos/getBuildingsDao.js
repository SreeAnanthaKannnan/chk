var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function buildings(buildingobject){
  return new Promise((resolve, reject)=>{
      logger.fatal(buildingobject,"=>buildingobject");
     // var id = buildingobject.id;
    //  var email_id=buildingobject.email_id;
   //   var type=buildingobject.type;
   //   var address=buildingobject.address;
   //   var buildingname=buildingobject.buildingname;


      var sql = "SELECT  * FROM Buildings where owner_id= '" + buildingobject + "'";
     // var sql= "SELECT *,Residents.mobile_number FROM Buildings INNER JOIN Residents ON Buildings.owner_id=Residents.email_id;"

      //var sql = await("INSERT INTO Buildings(owner_id ,type,address,Buildingname) VALUES ('"+ owner_id + "','" +type + "','" + address + "','" + Buildingname +"')");
      con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      logger.fatal(result,"inserted.......")
     resolve({
          Message: "get Buildings done",
           result:result
        })
      })
  })
}
function phone(buildingobject){
  return new Promise((resolve, reject)=>{
      logger.fatal(buildingobject,"=>buildingobject");
     // var id = buildingobject.id;
    //  var email_id=buildingobject.email_id;
   //   var type=buildingobject.type;
   //   var address=buildingobject.address;
   //   var buildingname=buildingobject.buildingname;


      var sql = "SELECT * FROM Residents where email_id = '" + buildingobject + "'";
     // var sql= "SELECT *,Residents.mobile_number FROM Buildings INNER JOIN Residents ON Buildings.owner_id=Residents.email_id;"

      //var sql = await("INSERT INTO Buildings(owner_id ,type,address,Buildingname) VALUES ('"+ owner_id + "','" +type + "','" + address + "','" + Buildingname +"')");
      con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      resolve({
          Message: "get phone number",
           result:result
        })
      })
  })
}
module.exports={
 buildings:buildings,
 phone:phone
}