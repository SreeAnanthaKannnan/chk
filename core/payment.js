var pay = require("../daos/payment.js");
var Employee_Dao = require("../daos/Employee_profileDao")
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");
module.exports = {
  payment: payment,
  payment_aman: payment_aman,
  payment_aman_install: payment_aman_install
};


function payment(payment1, token) {
  logger.fatal(payment1, "payment1");
  return new Promise(async (resolve, reject) => {
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
    }
    else {
      var responseObj = {};

      {

        var user = await pay
          .payment(payment1)
        console.log(user, "user")
        if (user.status == 200) {
          return resolve(user)
        }
        else {
          return resolve({
            status: 400,
            message: "something went wrong"
          })
        }
      }
    }
  });
}
function payment_aman(payment1, token) {
  console.log("payment_______aman",payment1)
  logger.fatal(payment1, "payment1");
  return new Promise(async (resolve, reject) => {
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
    }
    else {
      var responseObj = {};

      {

        var user = await pay
          .payment_aman(payment1)
        console.log("payment added", payment1)
        if (user.status == 200) {
          return resolve(user)
        }
        else {
          return resolve({
            status: 400,
            message: "something went wrong"
          })
        }

      }
    }
  });
}
function payment_aman_install(payment1, token) {
  logger.fatal(payment1, "payment1");
  return new Promise(async (resolve, reject) => {
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
    }
    else {
      var responseObj = {};

      {

        var user = await pay
          .payment_aman_install(payment1)
        if (user.status == 200) {
          return resolve(user)
        }
        else {
          return resolve({
            status: 400,
            message: "something went wrong"
          })
        }
      }
    }
  });
}
//=======================================code End==============================================================//