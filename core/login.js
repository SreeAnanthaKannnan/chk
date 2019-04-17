/*
@Manoj Savaram
*/
var login = require("../daos/loginDao.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
let secret = "rapidqubepvtltd";
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const sessionDao = require("../daos/SessionDao");

var dateFormat = require("dateformat");
module.exports = {
  loginuser: loginuser
};
//function to check login credentials
function loginuser(loginobject) {
  return new Promise(async (resolve, reject) => {
    var email_id = loginobject.email;
    var password = loginobject.password;
    //Query DataBase for verify
    var result = await login.login(loginobject);
    if (!result.result) {
      return reject({
        message: "Invalid User name",
        status: 401
      });
    } else {
      let registered_password = cryptr.decrypt(result.result.password);
      let registered_user = result.result.email_id;
      var user = result.result.user_type;
      if (registered_user == email_id && registered_password == password) {
        //generating the token
        let token = jwt.sign(
          {
            email_id
          },
          secret,
          {
            expiresIn: "300000" // expires in 24 hours
          }
        );
        let query_value = [
          registered_user,
          token,
          dateFormat("yyyy-mm-dd HH:MM:ss")
        ];
        let session_select = await sessionDao.Session_select(registered_user);
        console.log("session handling=======>>>>", session_select);
        if (session_select.length == 0) {
          let Session = await sessionDao.Session_insert(query_value);
          console.log(Session);
          return resolve({
            message: "Login Successfull",
            status: 200,
            user_type: user,
            token: token,
            email_id: registered_user,
            first_name_en: result.result.firstname_en,
            first_name_ar: result.result.firstname_ar,
            company_name_en: result.result.company_en,
            company_name_ar: result.result.company_ar,
            النتيجة: "تسجيل الدخول ناجح"
          });
        } else {
          let query_value = [
            token,
            dateFormat("yyyy-mm-dd HH:MM:ss"),
            registered_user
          ];
          let update_session = await sessionDao.Session_update(query_value);
          console.log(update_session);

          return resolve({
            message: "Login Successfull",
            status: 200,
            user_type: user,
            token: token,
            email_id: registered_user,
            first_name_en: result.result.firstname_en,
            first_name_ar: result.result.firstname_ar,
            company_name_en: result.result.company_en,
            company_name_ar: result.result.company_ar,
            النتيجة: "تسجيل الدخول ناجح"
          });
        }
      } else {
        return reject({
          message: "Password is Incorrect",
          status: 401,
          النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"
        });
      }
    }
  });
}
