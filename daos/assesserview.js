var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
    assement_get:assement_get
}

function assement_get(){
    return new Promise(async(resolve, reject)=>{

//=============================================Select Schedules details form Schedules Table================================================================//        
var sql= "SELECT Schedules.schedule_time,Schedules.status, Buildings.buildingname,Buildings.email_id,Schedules.id,Buildings.address,Buildings.lat,Buildings.lon, Schedules.requestdate FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id;"
con.query(sql,function(err,result){
    if(err) { logger.fatal("something",err)
        return reject({ "status": 400, "body": 'failed to insert' })}
        else{
              logger.fatal(result,"result in Daos");
        return resolve({result});
        }
    });  
});
}
//=============================================Code End================================================================//        

