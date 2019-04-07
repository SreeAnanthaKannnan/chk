const con = require('../mysql_connection/dbConfig');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
//Here the we query the DB to check prefered schedule of building owner is available or not
function auto(t,s,D){
    logger.fatal("auto s",s);
    logger.fatal("auto t",t);
    logger.fatal("auto D",D);
    return new Promise(async function (resolve,reject){  
var sql="select * from Schedules where schedule_time = '" + t + "' AND suplier_id='"+ s+"' AND requestdate='"+ D +"'";
con.query(sql,function(err,result){
    if(err) { 
        return reject({ "status": 400, "body": 'Cannot insert the data' })}
        else{
              logger.fatal(result,"achieved")
        return resolve({ result});
        }
        
    });
})
}
//Here we check next available slots for the Buildings
function auto1(time,idate){
   
    logger.fatal("auto1 t",time);
    logger.fatal("auto1 D",idate);
    return new Promise(async function (resolve,reject){  
var sql="select * from Schedules where schedule_time = '" + time + "' AND requestdate='"+ idate +"'ORDER BY `schedule_time`,`requestdate` ASC";
con.query(sql,function(err,result){
    if(err) { 
        return reject({ "status": 400, "body": 'Cannot insert the data' })}
        else{
              logger.fatal(result,"achieved")
        return resolve({ result});
        }
        
    });
})
}
module.exports={
    auto:auto,
    auto1:auto1
}
