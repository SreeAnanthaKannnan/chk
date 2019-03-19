var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

async function image_path(filepath,id) {
    console.log("in dao",filepath,id)
   return new Promise( async function (resolve,reject){
    var params=[filepath,id]
     console.log(params,"in line 12")
//====================================================Insert pdf file path into Buildings Table====================================================//   
    mysqlConnection
    .query_execute(query.imagepdf,params)
    .then(function(result, err) {
      if (err) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ status: 200, message: result });
      }
    });
   })
}
module.exports={
   image_path : image_path
}
//====================================================Code End====================================================//   
