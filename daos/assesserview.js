var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

module.exports={
    assement_get:assement_get
}

function assement_get(supplier_email_id){
    return new Promise(async(resolve, reject)=>{


        var res1 = await mysqlConnection.query_execute(query.supplier_building_list, [supplier_email_id])


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
//=============================================Code End================================================================//  