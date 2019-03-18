const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function updatedao(values){
        return new Promise((resolve, reject)=>{

//=====================================Update Installation Details into Schedules Details==============================================================//
            var params=[values.FACP,values.CSI,values.BRAND,values.status,values.id]
           mysqlConnection
       .query_execute(query.installationdetails,params)
       .then(function(result, err) {
         if (err) {
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
    updatedao: updatedao
}
//=====================================Code End==============================================================//
