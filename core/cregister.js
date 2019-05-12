var con = require("../mysql_connection/dbConfig.js");
var dbFunc = require("../mysql_connection/connection.js");
var registerform = require("../daos/cregisterDao.js");
var otpfun = require("../utils/otp.js");
var emailotpfun = require("../utils/spsaemail");
const SendOtp = require("sendotp");
const sendOtp = new SendOtp("254625AbVGrmks5c2c92bd");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const checktoken = require("../utils/checkToken");
let now = new Date();
//Here the verification of user details
function cregister(registerobject) {
  return new Promise(async (resolve, reject) => {
    console.log("success");
    var email_id = registerobject.email;
    logger.fatal(!email_id);
    if (!email_id) {
      logger.fatal("email is not null");
      return reject({
        status: 400,
        message: "Please provide Mandatory fields",
        رسالة: "يرجى تقديم حقول إلزامية"
      });
    } else {
      var verify = await registerform.delete_user_name(registerobject)
      console.log(verify.message.data.length,"delete result======>")

      if(verify.message.data.length !=0){
      if(verify.message.data[0].verify_email =="N"){
        var verification = await registerform.delete_user_entry(registerobject)
        console.log(verification,"verification=========================>")
        var otp1 = await otpfun.otpgen();
        var otp = otp1.otp;
        // logger.fatal("in core before mail")
        await emailotpfun.emailotp(email_id, otp);
        var result = await registerform.insert_user(registerobject, otp);
        //logger.fatal(result, "inserted.......")
        return resolve({
          status: 200,
          message: "Please check your mail for otp verification"
        });
      }
      else {
       
          return reject({
            status: 409,
            message: "User Already Registered",
            الرسالة: "مستخدم مسجل بالفعل"
          });
      }
    }
    //}
  
      
    
    
    else {
      var otp1 = await otpfun.otpgen();
      var otp = otp1.otp;
      // logger.fatal("in core before mail")
      await emailotpfun.emailotp(email_id, otp);
      var result = await registerform.insert_user(registerobject, otp);
      //logger.fatal(result, "inserted.......")
      return resolve({
        status: 200,
        message: "Please check your mail for otp verification"
      });
    }

      
      

  }  
  });
}
//========================================================
async function owner_details(owner_details, token) {
  return new Promise(async (resolve, reject) => {
    console.log("enter in to core_reg");
    /*==========Token validation=================*/
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
      /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */
      var employee_name = owner_details.owner_name;
      var email_id = owner_details.email_id;
      console.log("employee_name_core====>>", employee_name);
      let owner_details_details = await registerform.owner_details_name(
        employee_name,
        email_id
      );
      console.log("owner_details_details_core===>", owner_details_details);
      return resolve({
        status: 200,
        message: owner_details_details
      });
    }
  });
}
//============================================================================
async function hr_details(hr_details, token) {
  return new Promise(async (resolve, reject) => {
    /*==========Token validation=================*/
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
      /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */
      //var employee_name=owner_details.owner_name
      var email_id = hr_details.email_id;

      let hr_details_details = await registerform.hr_details_name(email_id);

      return resolve({
        status: 200,
        message: hr_details_details
      });
    }
  });
}
async function add_admin(add_admin) {
  return new Promise(async (resolve, reject) => {
    var first_name = add_admin.first_name;
    console.log("first_name", first_name);
    var last_name = add_admin.last_name;
    console.log("last_name", last_name);
    var alternate_phone_number = add_admin.alternate_phone_number;
    console.log("alternate_phone_number", alternate_phone_number);

    var emirates_id = add_admin.emirates_id;
    console.log("emirates_id", emirates_id);

    var mobile_number = add_admin.mobile_number;
    console.log("mobile_number", mobile_number);
    var select_services = add_admin.select_services;
    console.log("select_services", select_services);
    var email_id = add_admin.email_id;
    console.log("email_id", email_id);
    var password = cryptr.encrypt(add_admin.password);
    console.log("pass", password);
    var user_type = "super_admin";
    var verify_email = "N";
    var reg_date = now;

    var select_query = [
      first_name,
      last_name,
      alternate_phone_number,
      emirates_id,
      mobile_number,
      email_id,
      password,
      verify_email,
      user_type,
      reg_date,
      select_services
    ];
    console.log("select_queery", select_query);

    var result = await registerform.add_admin(select_query);
    console.log("result===>>", result);
    return resolve({
      status: 200,
      message: result
    });
  });
}

module.exports = {
  cregister: cregister,
  owner_details: owner_details,
  hr_details: hr_details,
  add_admin: add_admin
};
