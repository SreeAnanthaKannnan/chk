const hr_registrationDao = require("../daos/Hr_RegistrationDao");
const util = require("../utils/otp_generation");
const emailOTP = require("../utils/email_otp_generation");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

exports.hr_forget_password = request =>
  new Promise(async (resolve, reject) => {
    console.log(request, "request");
    let Company_Email = request.email_id;
    console.log(Company_Email);
    let confirmpassword = request.confirmpassword;
    let Password = request.password;
    if (!Company_Email || !Password || !confirmpassword) {
      // var messagevalue = await  message.getmessage("en","E10")
      // console.log(messagevalue,"last")

      return resolve({
        statuscode: "E10",
        status: 400,
        message: "Please fill all the fields"
      });
    } else {
      var query = await hr_registrationDao.Hr_select(Company_Email);
      console.log(query, "forgotquery");
      if (query.length == 0) {
        // var messagevalue = await  message.getmessage("en","E11")
        // console.log(messagevalue,"last")

        return resolve({
          statuscode: "E11",
          status: 401,
          message: "Invalid Email_id"
        });
      } else {
        if (Password != confirmpassword) {
          // var messagevalue = await  message.getmessage("en","E12")
          // console.log(messagevalue,"last")

          return resolve({
            statuscode: "E12",
            status: 402,
            message: "Password Doesn't Match"
          });
        } else {
          if (cryptr.decrypt(query[0].Password) == Password) {
            // var messagevalue = await  message.getmessage("en","E13")
            // console.log(messagevalue,"last")

            return resolve({
              statuscode: "E13",
              status: 404,
              message: "Password Shouldn't be Previously Used One"
            });
          } else {
            console.log(Company_Email, "wow");
            let otp = await util.otp_generation();
            console.log(otp, "testing");
            console.log(Company_Email, "wow");

            let emailotp = await emailOTP.email_otp(otp, Company_Email);
            console.log(Company_Email, "testingweewrewrwer");

            var update_query = await hr_registrationDao.email_otp_update(
              otp,
              Company_Email
            );

            // var messagevalue = await  message.getmessage("en","E03")
            // console.log(messagevalue,"last")

            return resolve({
              statuscode: "E03",
              status: 200,
              message: "Please Check Your Email for One Time Password"
            });
          }
        }
      }
    }
  });
