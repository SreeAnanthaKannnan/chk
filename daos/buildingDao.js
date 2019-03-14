var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function building(buildingobject,email_id){
    return new Promise(async(resolve, reject)=>{
        logger.fatal(buildingobject,"=>buildingobject");
       var owner_id=email_id;
       var type=buildingobject.type;
       var address=buildingobject.address;
        var Buildingname = buildingobject.Buildingname;
        var lat=buildingobject.lat;
        var lon = buildingobject.lon;
        var cdccn = buildingobject.cdccn;
        var AMC = buildingobject.AMC;
        var NSP = buildingobject.NSP;
        var SPCN = buildingobject.SPCN;
        var sql = await("INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ('"+ owner_id + "','" +type + "','" + address + "','" + Buildingname +"','" + lat +"','" + lon +"','" + cdccn +"','" + AMC +"','" + NSP +"','" + SPCN +"')");
        con.query(sql, function (err, result) {
        if (err) throw err;
        dbFunc.connectionRelease;
        logger.fatal("DataBase ERR:",err)
        logger.fatal(result,"inserted.......")
         })
       resolve({
            Message: "Add Building done",
           
          })
        })
    }

module.exports={
   building:building
}



