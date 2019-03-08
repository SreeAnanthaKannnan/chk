var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

async function image_path(filepath,id) {
    console.log("in dao",filepath,id)
   return new Promise( async function (resolve,reject){
      
        var sql = "UPDATE Schedules SET filepath = '" + filepath + "' WHERE id = '" + id + "'";
      await con.query(sql,async function(err,result){
       if(err) {
           return resolve({ "status": 200, "body": 'Cannot insert the data' })}
           else{
             
           return resolve({ result});
           }

       });
   })
}

module.exports={
   image_path : image_path
}