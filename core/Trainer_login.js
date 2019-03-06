const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const TrainerDao = require("../daos/TrainerDao");
const message = require("../utils/messages");
const token_gen = require("../utils/token");
const sessionDao = require("../daos/SessionDao");
let date = require("date-and-time");
let now = new Date();

exports.trainer_login = request =>
  new Promise(async (resolve, reject) => {
    console.log(request, "teting");
    let Email_ID = request.Email_ID;
    let password = request.Password;

    let select_query = await TrainerDao.Trainer_information(Email_ID);
    console.log("hiiiiii", select_query);
    console.log(select_query.length, "selected value");
    if (select_query.length == 0) {
      let messagevalue = await message.getmessage("en", "E06");
      console.log(messagevalue, "last");

      return resolve({
        statuscode: "E06",
        status: 200,
        message: "User Doesn't Exists"
      });
    } else {
      let registered_password = cryptr.decrypt(select_query[0].password);
      console.log(registered_password, "db password");

      let registered_user = select_query[0].Trainer_emailid;
      console.log(registered_user, "user nameeeeeeeee");
      if (registered_password != password) {
        return resolve({
          status: 401,
          message: "Invalid Password"
        });
      }

      if (registered_user == Email_ID && registered_password == password) {
        console.log("login===>");

        // Issue token
        let value = await token_gen.token(Email_ID);
        let token = value.result;
        console.log("token ==>", token);
        console.log(
          date.format(now, "YYYY/MM/DD HH:mm:ss"),
          "kaviiiiiiiiiiiii"
        );
        // let query_value =[Email_ID,token,now.toTimeString().split(' ')[0]]
        let query_value = [
          Email_ID,
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
          message: "Login Successful"
        });
      }
    }
  });
