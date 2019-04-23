var con = require("../mysql_connection/dbConfig.js");
var dbFunc = require("../mysql_connection/connection.js");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
module.exports = {
  Adminmap_get: Adminmap_get,
  Adminmapactive_get: Adminmapactive_get
};

function Adminmap_get() {
  return new Promise(async (resolve, reject) => {
    console.log("kdhfkjdhkjhdk");
    //=============================================Select Schedules details form Schedules Table================================================================//

    var sql = "SELECT status FROM Schedules";

    con.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("resultdfdfdfdfdfd", result);

      //  var sql= "UPDATE Buildings SET P220V ='"+checked1+"', FASA='"+checked2+"', FARS='"+checked3+"',FAFS='"+checked4+"',TAMS='"+checked5+"', FPPS='"+checked6+"', FPFS='"+checked7+"',SIM='"+checked8+"',TLA='"+checked9+"', FACR='"+checked10+"',Assessment1='yes',Flag='1' where email_id='"+owner_id+"'";
      //   var sql =
      //     "SELECT Buildings.lat,Buildings.lon FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Schedules.status!='installed' AND Buildings.lat!='null' AND Buildings.lon!='null'";

      var sql =
        "SELECT Buildings.lat,Buildings.lon,Buildings.Buildingname,REPLACE(Buildings.address,'||',' ') AS address FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Schedules.status!='installed' AND Buildings.lat!='null' AND Buildings.lon!='null'";

      con.query(sql, function(err, result) {
        if (err) {
          console.log("something", err);
          return reject({ status: 400, body: "Cannot insert the data" });
        } else {
          return resolve({ result });
        }
      });
      console.log(result, "Given-got");
    });
  });
}

function Adminmapactive_get() {
  return new Promise(async (resolve, reject) => {
    console.log("kdhfkjdhkjhdk");
    //=============================================Select Schedules details form Schedules Table================================================================//

    var sql = "SELECT status FROM Schedules";

    con.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
      console.log("resultdfdfdfdfdfd", result);

      //  var sql= "UPDATE Buildings SET P220V ='"+checked1+"', FASA='"+checked2+"', FARS='"+checked3+"',FAFS='"+checked4+"',TAMS='"+checked5+"', FPPS='"+checked6+"', FPFS='"+checked7+"',SIM='"+checked8+"',TLA='"+checked9+"', FACR='"+checked10+"',Assessment1='yes',Flag='1' where email_id='"+owner_id+"'";
      // var sql="SELECT Buildings.lat,Buildings.lon FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Schedules.status ='installed'";

      var sql =
        "SELECT Buildings.lat,Buildings.lon,Buildings.Buildingname,REPLACE(Buildings.address,'||',' ') AS address FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Schedules.status ='installed'";
      con.query(sql, function(err, result) {
        if (err) {
          console.log("something", err);
          return reject({ status: 400, body: "Cannot insert the data" });
        } else {
          return resolve({ result });
        }
      });
      console.log(result, "kllklkl");
    });
  });
}
