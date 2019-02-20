var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var registerform = require('../daos/aregisterDao.js');
var otpfun = require('../utils/otp.js');
var emailotpfun = require('../utils/email');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('254625AbVGrmks5c2c92bd');
var bcSdk = require('../fabric_SDK/invoke');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function aregister(registerobject){
    return new Promise( async (resolve, reject)=>{
        var email_id = registerobject.email;
        console.log("hai");
        console.log(!email_id)
        if(!email_id){
          console.log("email is not null")
         return reject({
            "status":400,
            "message":"Please provide Mandatory fields",
            "رسالة": "يرجى تقديم حقول إلزامية"
          })
        }
        else{
   
           var result = await registerform.verify_user(registerobject)
      
        console.log(result.result.length != 0);
       
        dbFunc.connectionRelease;
        if(result.result.length != 0){
      return reject({
          "status":409,
          "message":"User Already Registered",
                  الرسالة: "مستخدم مسجل بالفعل",
                 
        })
       
        }

        else{	

          var otp = await otpfun.otpgen();
          console.log("in core before mail")
          await emailotpfun.emailotp(email_id,otp)
      
           var result =  await registerform.insert_user(registerobject,otp)
          let id = email_id;
           var userdetails = {
               "userId" : id,
                "transactionstring" : registerobject 
           }

           bcSdk.updatetransaction({ updatedetails: userdetails})
        console.log(result,"inserted.......")
       return resolve({
           Message:"Registration successfull"
          })
       }
      }
      });
}
module.exports={
    aregister:aregister
}