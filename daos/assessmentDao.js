var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function assessment_insert(values){
        return new Promise((resolve, reject)=>{
            var id=values.id
       var status=values.status
       logger.fatal("dkfhd",status)
       logger.fatal(values,"hiii")
        var sql = "UPDATE Schedules SET status = '" + status + "' WHERE id = '" + id + "'";
        logger.fatal(sql,"dql")
                con.query(sql, function (err, result) {
                if (err) throw err;
                dbFunc.connectionRelease;
        //logger.fatal("DataBase ERR:",err)
        logger.fatal(result,"update.......")
       resolve({
            Message: "assessment done",
                  })
        })
    })
}
module.exports={
   assessment_insert: assessment_insert
}
