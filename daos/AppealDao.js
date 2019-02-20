const con = require('../mysql_connection/dbConfig');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function Appeal_insert(params) {
    return new Promise( function (resolve,reject){
        params =[params]
        sql= "INSERT INTO Appeal1 (service,Description) VALUES ? ";
       con.query(sql,[params] ,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                
            return resolve({ result});
            }
            }); 
    })
}
module.exports={
    Appeal_insert : Appeal_insert
}