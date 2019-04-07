var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
module.exports ={
    verifydao:verifydao,
    updateotp:updateotp 
}
function verifydao(otpobject){
    return new Promise((resolve, reject)=>{

        //=====================================Update Installation Details into Schedules Details==============================================================//
                    var params=[otpobject.email]
                   mysqlConnection
               .query_execute(query.otpverify,params)
               .then(function(result, err) {
                 if (err) {
                   logger.fatal(err,"db error while verify the existence of otp")
                   return resolve({ status: 400, err: err });
                 } else {
                   console.log(result.data[0],"in  dao 21");
                   return resolve({ status: 200, result: result.data[0] });
                 }
               });
            })


}
function updateotp(otpobject){
    return new Promise((resolve, reject)=>{

        //=====================================Update Installation Details into Schedules Details==============================================================//
        var yes="Y"           
        var params=[yes,otpobject.otp]
                   mysqlConnection
               .query_execute(query.updateotp,params)
               .then(function(result, err) {
                 if (err) {
                   logger.fatal(err,"db error while updating the otp for the registered user")
                   return resolve({ status: 400, err: err });
                 } else {
                   console.log(result);
                   return resolve({ status: 200, message: result });
                 }
               });
            })


}



