var asser = require("../daos/assesserview");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");

module.exports = {
 assesserview: assesserview
};
//===============Fetching the details from the Daos both building and schedule information=========================================//
function assesserview(token,supplier_email_id) {
 return new Promise(async (resolve, reject) => {
   var verifytoken = await checktoken.checkToken(token);
   console.log(verifytoken);
       if (verifytoken.status == 405) {
     return resolve({
       status: verifytoken.status,
       message: verifytoken.message,
     });
   } else if (verifytoken.status == 403) {
     return resolve({
       status: verifytoken.status,
       message: verifytoken.message
     });
   } else {
     var result = await asser.assement_get(supplier_email_id);
     console.log("result in core file", result);
     if (result) {
       resolve({
         status: 200,
         result: result.result,
         message:"Details"
       });
     }
     reject({
       message: "no requests available"
     });
   }
 });
}
//===============Code End===============================================================================================================//