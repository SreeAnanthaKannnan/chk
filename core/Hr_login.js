const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const hr_registrationDao = require("../daos/Hr_RegistrationDao");
const message = require("../utils/messages");
const token_gen = require("../utils/token");
const sessionDao = require("../daos/SessionDao");
let date = require("date-and-time");
let now = new Date();

exports.hr_login = login =>
  new Promise(async (resolve, reject) => {
    let Company_Email = login.Company_Email;
    let Password = login.Password;
    console.log(login, "hiiiiii");
    let select_query = await hr_registrationDao.Hr_select(Company_Email);
    console.log(select_query.length, "selected value");
    // console.log(select_query[0].Password, "kaviiii");
    if (select_query.length == 0) {
      let messagevalue = await message.getmessage("en", "E06");
      console.log(messagevalue, "last");

      return resolve({
        statuscode: "E06",
        status: 404,
        message: "User Doesn't Exists"
      });
    } else {
      let registered_password = cryptr.decrypt(select_query[0].Password);
      console.log(registered_password, "db password");
      let registered_user = select_query[0].Company_Email;
      console.log(registered_user, "user nameeeeeeeee");
      if (registered_password != Password) {
        return resolve({
          status: 401,
          message: "Invalid Password"
        });
      }

      if (registered_user == Company_Email && registered_password == Password) {
        // Issue token
        let value = await token_gen.token(Company_Email);
        let token = value.result;
        console.log("token ==>", token);
        console.log(
          date.format(now, "YYYY/MM/DD HH:mm:ss"),
          "kaviiiiiiiiiiiii"
        );
        // let query_value =[Company_Email,token,now.toTimeString().split(' ')[0]]
        let query_value = [
          Company_Email,
          token,
          date.format(now, "YYYY/MM/DD HH:mm:ss")
        ];
        let Session = await sessionDao.Session_insert(query_value);

        let messagevalue = await message.getmessage("en", "E08");
        console.log(messagevalue, "last");

        return resolve({
          statuscode: "E08",
          status: 200,
          Token: token,
          message: select_query[0]
        });
      }
    }
  });
