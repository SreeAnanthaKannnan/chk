
var login = require('../daos/loginDao.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');
let secret= 'rapidqubepvtltd';
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

module.exports={
    loginuser:loginuser
}
function loginuser(loginobject) {
    logger.fatal(loginobject,"loginobject")
   return new Promise(async (resolve, reject) => {
    //    var responseObj = {};
    var email_id=loginobject.email;
      var password=loginobject.password;

         var result = await login.login(loginobject)
         //var resultadmin = await login.loginadmin(loginobject)
       //logger.fatal(result.result[0].password,"test")
    logger.fatal(result.result.length == 0 )
    if(result.result.length == 0 ){
        return reject({
          "message":"Invalid User name",
            "status":401,
           
          })
        }
        else{
      // if(result.verify_email=="N"){
      // return resolve ({Message:"One Time Password is not verified.Please register Again",
      // "status":"false",
      // الرسالة: "لم يتم التحقق من كلمة المرور مرة واحدة.الرجاء تسجيل مرة أخرى"
      // })
      
      // }
      // else{
          logger.fatal(result.result[0].password,"test")
      let  registered_password =  cryptr.decrypt(result.result[0].password);
      logger.fatal(registered_password,"db password")
      let registered_user = result.result[0].email_id;
      logger.fatal(registered_user,"user nameeeeeeeee");
      var user = result.result[0].user_type;
        if(registered_user == email_id &&  registered_password == password){
          let token = jwt.sign({email_id},
           secret,
            { expiresIn: '500000000000000000000000000' // expires in 24 hours
            }
          );
        return resolve ({
                "message":"Login Successfull",
                "status":200,
                "user":user,
                "token":token,
                "النتيجة": "تسجيل الدخول ناجح"
           });
              }
      else{
        logger.fatal("pass ")
      return reject({
        "message":"Password is Incorrect",
        "status": 401,
       النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"
      })
      }
      }
      //}   
})
}
