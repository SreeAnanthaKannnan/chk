var pay = require("../daos/Payment_salamaDao.js");
var Employee_Dao = require("../daos/Employee_profileDao")
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");

exports.payment_statusupdate_salama = (payment1, token) =>
  new Promise(async (resolve, reject) => {
    
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
     var payment_callcenter_update = await pay.payment_callcenter_salama(payment1)

     console.log(payment_callcenter_update,"verify=======<<<<<<<<")
     if(payment_callcenter_update.status ==400){
       return reject({
         status:400,
         message:"something went wrong"
       })
     }
     else if (verifytoken.status == 405) {
      console.log("core")
      return resolve({
          status: verifytoken.status,
          message: verifytoken.message
      })
  } else if (verifytoken.status == 403) {
      return resolve({
          status: verifytoken.status,
          message: verifytoken.message
      })
  }
     else{
         return resolve({
             status:200,
             message:"updation is successfull"
         })
     }



    }

        
  });