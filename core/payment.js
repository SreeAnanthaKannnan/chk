var pay = require("../daos/payment.js");
var Employee_Dao = require("../daos/Employee_profileDao")
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");
var mail = require("../utils/spsaemail");
module.exports = {
  payment: payment,
  payment_aman: payment_aman,
  payment_aman_install: payment_aman_install,
  payment_aman_status:payment_aman_status,
  payment_aman_pref:payment_aman_pref,
  getpushcount:getpushcount,
  clearnotify:clearnotify

};


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
    }
    else {
      var responseObj = {};

      
        {
          var verify = await pay.pay_verify_status(payment1.order_id)
          console.log(verify,"verify=======<<<<<<<<")
          if(verify.status ==400){
            return reject({
              status:401,
              message:"something went wrong"
            })
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
            
          
         
        else{
  
        var user = await pay
          .payment(payment1)
          console.log(user,"user=======<<<<<<")
          console.log("payment added", payment1)
          if(user.message.data.affectedRows ==0){
            logger.fatal("no rows are updated in aman_building owner")
            return reject({
              status:400,
              message:"something went wrong"
            })
          }
          if (user.status == 200) {
            return resolve({
              status:200,
              message:"payment is updated successfully"
            })
          }
          else {
            return resolve({
              status: 400,
              message: "something went wrong"
            })
          }
  
        // }
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
         var verify = await pay.pay_verify(payment1.orderid)
         console.log(verify,"verify=======<<<<<<<<")
         if(verify.status ==400){
           return reject({
             status:401,
             message:"something went wrong"
           })
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
           
         
        
       else{
        var user = await pay
          .payment_aman(payment1)
          console.log(user,"user=======<<<<<<")
        console.log("payment added", payment1)
        if(user.message.data.affectedRows ==0){
          logger.fatal("no rows are updated in aman_building owner")
          return reject({
            status:400,
            message:"something went wrong"
          })
        }
        if (user.status == 200) {
          return resolve({
            status:200,
            message:"payment is updated successfully"
          })
        }
        else {
          return resolve({
            status: 400,
            message: "something went wrong"
          })
        }

      // }
    }
    }
    }
  });
}
function payment_aman_status(payment1, token) {
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

        var user = await pay
          .payment_aman_statusdao(payment1)
          if(payment1.status=="Work Scheduled")
          {
            await mail.acceptmailsendto(payment1)
          }
          console.log(user,"user=======<<<<<<")
        console.log("payment added", payment1)
        if(user.message.data.affectedRows ==0){
          logger.fatal("no rows are updated in aman_building owner")
          return reject({
            status:400,
            message:"something went wrong"
          })
        }
        if (user.status == 200) {
          return resolve({
            status:200,
            message:"status is updated successfully"
          })
        }
        else {
          return resolve({
            status: 400,
            message: "something went wrong"
          })
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
    }
    else {
      var responseObj = {};

      {
        var count = await pay.pushnotifycount(payment1)
        console.log(count.message.data[0].push_notify_count,"count===>=");
        var pushcount = count.message.data[0].push_notify_count+1;
        var emailoutput = mail.mailsendto(payment1);
        var user = await pay
          .payment_aman_pref(payment1,pushcount)
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
function getpushcount(details, token) {
  logger.fatal(details, "details");
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
        var pushcount = await pay.pushnotifycount(details)
        console.log(pushcount.message.data[0],"count===>=");
       var push_count = pushcount.message;
        if (pushcount.status == 200) {
          return resolve({
            status:200,
            count:push_count,
            // message:"Your Building is scheduled for service on "+push_count.preschedule+""
          })
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
function clearnotify(details, token) {
  logger.fatal(details, "details");
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
        var pushcount = await pay.pushnotifycountclear(details)
        if (pushcount.status == 200) {
          return resolve({
            status:200,
            //count:push_count,
             message:"notification set to zero"
          })
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
