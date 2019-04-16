var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var registerform = require('../daos/cregisterDao.js');
var otpfun = require('../utils/otp.js');
var emailotpfun = require('../utils/spsaemail');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('254625AbVGrmks5c2c92bd');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
//Here the verification of user details
function cregister(registerobject) {
  return new Promise(async (resolve, reject) => {
    console.log("success")
    var email_id = registerobject.email;
    logger.fatal(!email_id)
    if (!email_id) {
      logger.fatal("email is not null")
      return reject({
        "status": 400,
        "message": "Please provide Mandatory fields",
        "رسالة": "يرجى تقديم حقول إلزامية"
      })
    }
    else {

      var result = await registerform.verify_user(registerobject)
      logger.fatal(result.result.data.length != 0);
      dbFunc.connectionRelease;
      if (result.result.data.length != 0) {
        return reject({
          "status": 409,
          "message": "User Already Registered",
          الرسالة: "مستخدم مسجل بالفعل",
        })
      }
      else {
        var otp1 = await otpfun.otpgen();
        var otp = otp1.otp
       // logger.fatal("in core before mail")
        await emailotpfun.emailotp(email_id, otp)
        var result = await registerform.insert_user(registerobject, otp)
        //logger.fatal(result, "inserted.......")
        return resolve({
          status: 200,
          "message": "Please check your mail for otp verification",
        })
      }
    }
  });
}
//========================================================
async function owner_details(owner_details,token) {
  return new Promise(async (resolve, reject) => {
    console.log("enter in to core_reg")
    /*==========Token validation=================*/
    // var verifytoken = await checktoken.checkToken(token);
    // if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else {
      /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */
      var employee_name=owner_details.owner_name
      var email_id = owner_details.email_id
      console.log("employee_name_core====>>",employee_name)
      let owner_details_details = await registerform.owner_details_name(
        employee_name,
        email_id
      );
     console.log("owner_details_details_core===>",owner_details_details)
      return resolve({
        status: 200,
        message: owner_details_details
      });
    // }
  });
}
//============================================================================
async function hr_details(hr_details,token) {
  return new Promise(async (resolve, reject) => {
  
    /*==========Token validation=================*/
    // var verifytoken = await checktoken.checkToken(token);
    // if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else {
      /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */
      //var employee_name=owner_details.owner_name
      var email_id = hr_details.email_id
 
      let hr_details_details = await registerform.hr_details_name(
        
        email_id
      );
   
      return resolve({
        status: 200,
        message: hr_details_details
      });
    // }
  });
}
module.exports = {
  cregister: cregister,
  owner_details:owner_details,
  hr_details:hr_details
}