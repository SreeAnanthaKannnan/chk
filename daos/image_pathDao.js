var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function image_path(filepath,id) {

    return new Promise( function (resolve,reject){
        // console.log("hiiiii",params)
       // var image=image;
      // var values=[filepath,building_id]
        //sql= "INSERT INTO Schedules (uploadFile,building_id) VALUES ? ";
         var sql = "UPDATE Schedules SET filepath = '" + filepath + "' WHERE id = '" + id + "'";
       con.query(sql,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  console.log(result,"achieved")
            return resolve({ result});
            }
            
        }); 
    })
}

module.exports={
    image_path : image_path
}