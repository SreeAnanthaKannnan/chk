var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');

function pdf1(email){
  return new Promise((resolve, reject)=>{
      logger.fatal(email,"=>email");
//===============================================================query the pdf information get from pdf path=====================================================================//      
      mysqlConnection
    .query_execute(query.pdfviewer,email)
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
 pdf1:pdf1
}
//===========================================================Code End==================================================================//