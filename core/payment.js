var pay = require("../daos/payment.js");
var Employee_Dao = require("../daos/Employee_profileDao");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");
var mail = require("../utils/spsaemail");
var crypto = require("crypto");
var Request = require("request");
var config = require("config");
var api_config = config.get("tahseel_gateway");

module.exports = {
  payment: payment,
  payment_aman: payment_aman,
  payment_aman_install: payment_aman_install,
  payment_aman_status: payment_aman_status,
  payment_aman_pref: payment_aman_pref,
  getpushcount: getpushcount,
  clearnotify: clearnotify,
  payment_hash: payment_hash,
  payment_res: payment_res
};
async function payment_res(result) {
  console.log("result", result);
  var select_query = [
    result.TP_Amount,
    result.TP_Extrafees,
    result.TP_Paymentdate,
    result.TP_PayMethod,
    result.TP_ReceiptNo,
    result.TP_RefNo,
    result.TP_ResultCode,
    result.Taxfees,
    result.TP_RefNo
  ];

  var paymentDB = await pay.payment_res(select_query);
  if (paymentDB.message == "Detail saved sucessfully") {
    if (result.TP_ReceiptNo != undefined) {
      return true;
    } else {
      return false;
    }
  }
}
async function payment_hash(request) {
  return new Promise(async (resolve, reject) => {
    var token = request.headers.authorization;
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
      var branch_id = 1;
      var internalDep = "01";
      var language = request.headers.language;
      var returnUrl = "http://35.244.43.69:4000/getResponse";
      var refNum = request.body.orderid;
      var merchant_id = "6432423";
      var payerName = request.body.payerName;
      var serviceInfo = "28#01#01#002#250#1";

      const string =
        "TP_BranchId" +
        "=" +
        branch_id +
        "&" +
        "TP_InternalDep" +
        "=" +
        internalDep +
        "&" +
        "TP_Language" +
        "=" +
        language +
        "&" +
        "TP_Merchant" +
        "=" +
        merchant_id +
        "&" +
        "TP_PayerName" +
        "=" +
        payerName +
        "&" +
        "TP_RefNo" +
        "=" +
        refNum +
        "&" +
        "TP_ReturnURL" +
        "=" +
        returnUrl +
        "&" +
        "TP_ServiceInfo" +
        "=" +
        serviceInfo;
      console.log("string", string);
      var key = "2DE65AC73FB98BC41FD39AE12BD68FE4";
      var hmac;

      hmac = crypto
        .createHmac("sha256", new Buffer(key, "hex"))
        .update(string)
        .digest("hex");
      console.log("hmac hash", hmac.toUpperCase());
      var returnURL = "http%3A%2F%2F35.244.43.69%3A4000%2FgetResponse";
      var sourceINF0 = "28%2301%2301%23002%23250%231";
      var finaldata =
        "TP_BranchId" +
        "=" +
        branch_id +
        "&" +
        "TP_InternalDep" +
        "=" +
        internalDep +
        "&" +
        "TP_Language" +
        "=" +
        language +
        "&" +
        "TP_Merchant" +
        "=" +
        merchant_id +
        "&" +
        "TP_PayerName" +
        "=" +
        payerName +
        "&" +
        "TP_RefNo" +
        "=" +
        refNum +
        "&" +
        "TP_ReturnURL" +
        "=" +
        returnURL +
        "&" +
        "TP_ServiceInfo" +
        "=" +
        sourceINF0 +
        "&" +
        "&" +
        "TP_SecHash" +
        "=" +
        hmac.toUpperCase();

      console.log("final", finaldata);
      var select_query = [
        branch_id,
        internalDep,
        language,
        merchant_id,
        payerName,
        refNum,
        returnUrl,
        serviceInfo,
        refNum
      ];
      var paymentDB = await pay.payment_req(select_query);
      console.log(paymentDB);
      if (paymentDB.message == "Detail saved sucessfully") {
        var options = {
          url: api_config.url + finaldata,
          username: api_config.username,
          password: api_config.password,
          method: "GET"
        };
        // console.log("url", options.url);
        Request(options, async function(err, res, body) {
          // console.log(res.body);
        });
        return resolve({
          status: 200,
          message: options.url
        });
      } else {
        return resolve({
          status: 400,
          message: "Incorrect data"
        });
      }
    }
  });
}
//s https://staging.tahseel.gov.ae/TahseelTestWebApp/Public/Services/Pay.aspx?
// "TP_BranchId=1&TP_InternalDep=01&TP_Language=ar-AE&TP_Merchant=6432423&"
// "TP_PayerName=MohamedShehata&TP_RefNo=PAY733769&"
// "TP_ReturnURL=http%3a%2f%2flocalhost%2fTahseelCallerWebApp%2fResponse_pay.aspx&"
// "TP_ServiceInfo=28%2301%2301%23002%23250%231&&TP_SecHash=B3C74C8C2B075DD51A8CBF06FAB8AEEF8A924422A686FA42386C217BE0378C41"
function payment(payment1, token) {
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
    } else {
      var responseObj = {};

      {
        var verify = await pay.pay_verify_status(payment1.order_id);
        console.log(verify, "verify=======<<<<<<<<");
        if (verify.status == 400) {
          return reject({
            status: 401,
            message: "something went wrong"
          });
        }
        // else{

        //   var status = verify.message.order_status
        //   console.log(status)
        //   console.log(status!=null,"null checking=====<<<<<")
        //   if(status == 'Order Raised' ||'Work Scheduled/Schedule'|| 'work completed' || 'Paid' || ''){
        //     return resolve({
        //       status:401,
        //       message:"Payment is not updated. Kindly contact call center"
        //     })
        //   }
        else {
          var user = await pay.payment(payment1);
          console.log(user, "user=======<<<<<<");
          console.log("payment added", payment1);
          if (user.message.data.affectedRows == 0) {
            logger.fatal("no rows are updated in aman_building owner");
            return reject({
              status: 400,
              message: "something went wrong"
            });
          }
          if (user.status == 200) {
            return resolve({
              status: 200,
              message: "payment is updated successfully"
            });
          } else {
            return resolve({
              status: 400,
              message: "something went wrong"
            });
          }

          // }
        }
      }
    }
  });
}
function payment_aman(payment1, token) {
  console.log("payment_______aman", payment1);
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
    } else {
      var responseObj = {};

      {
        var verify = await pay.pay_verify(payment1.orderid);
        console.log(verify, "verify=======<<<<<<<<");
        if (verify.status == 400) {
          return reject({
            status: 401,
            message: "something went wrong"
          });
        }
        //  else{

        //    var status = verify.message.status
        //    console.log(status)
        //    console.log(status!=null,"null checking=====<<<<<")
        //    if(status != "editable: false" ){
        //      return resolve({
        //        status:401,
        //        message:"Payment is not updated. Kindly contact call center"
        //      })
        //    }
        else {
          var user = await pay.payment_aman(payment1);
          console.log(user, "user=======<<<<<<");
          console.log("payment added", payment1);
          if (user.message.data.affectedRows == 0) {
            logger.fatal("no rows are updated in aman_building owner");
            return reject({
              status: 400,
              message: "something went wrong"
            });
          }
          if (user.status == 200) {
            return resolve({
              status: 200,
              message: "payment is updated successfully"
            });
          } else {
            return resolve({
              status: 400,
              message: "something went wrong"
            });
          }

          // }
        }
      }
    }
  });
}
function payment_aman_status(payment1, token) {
  console.log("payment_______aman", payment1);
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
    } else {
      var responseObj = {};

      var user = await pay.payment_aman_statusdao(payment1);
      if (payment1.status == "Work Scheduled") {
        await mail.acceptmailsendto(payment1);
      }
      console.log(user, "user=======<<<<<<");
      console.log("payment added", payment1);
      if (user.message.data.affectedRows == 0) {
        logger.fatal("no rows are updated in aman_building owner");
        return reject({
          status: 400,
          message: "something went wrong"
        });
      }
      if (user.status == 200) {
        return resolve({
          status: 200,
          message: "status is updated successfully"
        });
      } else {
        return resolve({
          status: 400,
          message: "something went wrong"
        });
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
    } else {
      var responseObj = {};

      {
        var user = await pay.payment_aman_install(payment1);
        if (user.status == 200) {
          return resolve(user);
        } else {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        }
      }
    }
  });
}
function payment_aman_pref(payment1, token) {
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
    } else {
      var responseObj = {};

      {
        var count = await pay.pushnotifycount(payment1);
        console.log(count.message.data[0].push_notify_count, "count===>=");
        var pushcount = count.message.data[0].push_notify_count + 1;
        var emailoutput = mail.mailsendto(payment1);
        var user = await pay.payment_aman_pref(payment1, pushcount);
        if (user.status == 200) {
          return resolve(user);
        } else {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        }
      }
    }
  });
}
function getpushcount(details, token) {
  logger.fatal(details, "details");
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // }
    // else
    {
      var responseObj = {};

      {
        var pushcount = await pay.pushnotifycount(details);
        console.log(pushcount.message.data[0], "count===>=");
        var push_count = pushcount.message;
        if (pushcount.status == 200) {
          return resolve({
            status: 200,
            count: push_count
            // message:"Your Building is scheduled for service on "+push_count.preschedule+""
          });
        } else {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        }
      }
    }
  });
}
function clearnotify(details) {
  logger.fatal(details, "details");
  return new Promise(async (resolve, reject) => {
    {
      var responseObj = {};

      {
        var pushcount = await pay.pushnotifycountclear(details);
        if (pushcount.status == 200) {
          return resolve({
            status: 200,
            //count:push_count,
            message: "notification set to zero"
          });
        } else {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        }
      }
    }
  });
}
//=======================================code End==============================================================//
