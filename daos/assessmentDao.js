var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
function assessment_insert(values){
        return new Promise((resolve, reject)=>{
//=========================================Update status information into Schedules Tables==================================================//
      console.log("vlaues in dao",values);
        mysqlConnection
        .query_execute(query.updatestatus,values)
        .then(function (result, err) {
          
            if (err) {
                logger.fatal("something", err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achieved")
                return resolve({ status:200});
            }
        })
    })
}
module.exports={
   assessment_insert: assessment_insert
}
//=========================================Code End==================================================//
