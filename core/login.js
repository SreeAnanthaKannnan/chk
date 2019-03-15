/*
@Manoj Savaram
*/
var login = require('../daos/loginDao.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');
let secret = 'rapidqubepvtltd';
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const sessionDao = require("../daos/SessionDao");
let date = require("date-and-time");
let now = new Date();
module.exports = {
  loginuser: loginuser
}
//function to check login credentials
function loginuser(loginobject) {
  logger.fatal(loginobject, "loginobject")
  return new Promise(async (resolve, reject) => {
    var email_id = loginobject.email;
    var password = loginobject.password;
//Query DataBase for verify    
    var result = await login.login(loginobject)
    logger.fatal(result.result)
    if (!result.result) {
      return reject({
        "message": "Invalid User name",
        "status": 401,

      })
    }
    else {
      logger.fatal(result.result.password, "password from Data Base")
      let registered_password = cryptr.decrypt(result.result.password);
      logger.fatal(registered_password, "db password decripted")
      let registered_user = result.result.email_id;
      logger.fatal(registered_user, "email_id from DataBase");
      var user = result.result.user_type;
      if (registered_user == email_id && registered_password == password) {
        let token = jwt.sign({ email_id },
          secret,
          {
            expiresIn: '500000000000000000000000' // expires in 24 hours
          }
        );
        let query_value = [
          registered_user,
          token,
          date.format(now, "YYYY/MM/DD HH:mm:ss")
        ];
        let Session = await sessionDao.Session_insert(query_value);
        return resolve({
          "message": "Login Successfull",
          "status": 200,
          "user_type": user,
          "token": token,
          "email_id": registered_user,
          "first_name_en": result.result.firstname_en,
          "first_name_ar": result.result.firstname_ar,
          "company_name_en": result.result.company_en,
          "company_name_ar": result.result.company_ar,
          "النتيجة": "تسجيل الدخول ناجح"
        });
      }
      else {
        logger.fatal("pass ")
        return reject({
          "message": "Password is Incorrect",
          "status": 401,
          النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"
        })
      }
   }
  })
}