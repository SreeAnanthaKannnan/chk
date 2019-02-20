var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function assessment_insert(values){
        return new Promise((resolve, reject)=>{
            var id=values.id
       var status=values.status
       console.log("dkfhd",status)
       console.log(values,"hiii")
        var sql = "UPDATE Schedules SET status = '" + status + "' WHERE id = '" + id + "'";
        console.log(sql,"dql")
                con.query(sql, function (err, result) {
                if (err) throw err;
                dbFunc.connectionRelease;
        //logger.fatal("DataBase ERR:",err)
        console.log(result,"update.......")
       resolve({
            Message: "assessment done",
                  })
        })
    })
}
module.exports={
   assessment_insert: assessment_insert
}
