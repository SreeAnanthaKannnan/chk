var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var registerform = require('../daos/cregisterDao.js');
var otpfun = require('../utils/otp.js');
var emailotpfun = require('../utils/spsaemail');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('254625AbVGrmks5c2c92bd');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
var bc = require('../fabcar/javascript/invoke');
//Here the verification of user details
function cregister(registerobject){
    return new Promise( async (resolve, reject)=>{
      console.log("success")
        var email_id = registerobject.email;
        logger.fatal(!email_id)
        if(!email_id){
          logger.fatal("email is not null")
         return reject({
            "status":400,
            "message":"Please provide Mandatory fields",
            "رسالة": "يرجى تقديم حقول إلزامية"
          })
        }
        else{
   
           var result = await registerform.verify_user(registerobject)
           console.log("result====>",result)
        logger.fatal(result.result);
       dbFunc.connectionRelease;
        if(result.result){
      return reject({
          "status":409,
          "message":"User Already Registered",
                  الرسالة: "مستخدم مسجل بالفعل",
        })
        }
        else{	
          var otp1 = await otpfun.otpgen();
          var otp = otp1.otp
          logger.fatal("in core before mail")
          await emailotpfun.emailotp(email_id,otp)
           var result =  await registerform.insert_user(registerobject,otp)
          let id = email_id;
           var params = {
               id : id,
               fun:"create",
               data: registerobject 
           }
        bc.main(params)
        logger.fatal(result,"inserted.......")
       return resolve ({   status: 200,
       "message": "Please check your mail for otp verification",
       }) 
       }
      }
      });
}
module.exports={
    cregister:cregister
}