const con = require('../mysql_connection/dbConfig');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function schedule_insert(values) {

    return new Promise( function (resolve,reject){
       values =[values]
       logger.fatal("values",values)
        let qry = "INSERT INTO Schedules(schedule_time,requestdate,suplier_id,building_id,status) VALUES ? ";
       con.query(qry,[values] ,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ 
                "status": 400, 
                "body": 'Cannot insert the data' })}
            else{
            return resolve({ result});
            }
            
        }); 
    })
}

module.exports={
    schedule_insert : schedule_insert
}
