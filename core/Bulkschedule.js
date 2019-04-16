/* 
@ Manoj savaram
*/
let insertquery = require("../daos/scheduleDao");
var supplier = require("../daos/getsupplierlist");
var auto = require("../daos/autoDao");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
//Here the time slots which are available stored in an array
var t = [
  "8-10 am",
  "10-12 am",
  "12-2 pm",
  "2-4 pm",
  "4-6 pm"
];
let moment = require("moment");
const checktoken = require("../utils/checkToken");
async function sup(time, rdate, building_id,token) {
  const idate = rdate;
  let sdate = rdate;
  console.warn("rdate", rdate);
  return new Promise(async function (resolve, reject) {
    console.warn("rdate", idate);
    /*============================Token Validation========================================*/
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
      var suparray = [];
      //Here we are fecthing latest installers list from the DataBase and stored in an array*/
      var sup = await supplier.supplier();
      
        logger.fatal("supplier list", sup.result[0].email_id);
        suparray.push(sup.result[0].email_id);
      
      logger.fatal("supplier", suparray);
      //Here we check the preferred time slot is available for the Building owner*/
      var result2 = await auto.auto(time,suparray[0],idate)
        if (result2.result == 0) {
            console.log("assigned req date");
            var schedule_time = time;
            var suplier_id = suparray[0];
            var requestdate = idate;
            var status = "open";
            var countvalue = sup.result[0].countvalue + 1;
            console.log(status);
            let data = [schedule_time, requestdate, suplier_id, building_id, status]
            let query = await insertquery.schedule_insert(data)
            let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
        var date22 = moment(requestdate).format("YYYY-MM-DD");  
return resolve({
                result: {
        "message":"Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time +"   As requested slot is available"

                }

            })
   } 
   else {
        //if preferred time slot unavilable we assign the next available slot for the Building*/
        for (var i = 0; i < t.length; i++) {
            logger.fatal(t[i]);
            var result = await auto.auto(t[i], suparray[0], sdate);
            if (result.length == 0) {
              if (result.length != suparray.length) {
                logger.fatal("assigned time", t[i]);
                var schedule_time = t[i];
                var suplier_id = suparray[0];
                var requestdate = sdate;
                logger.fatal("assigned to", suparray[0]);
                let status1 = "open";
                var countvalue = sup.result[0].countvalue + 1;
                logger.fatal("date", sdate);
                let data = [
                  schedule_time,
                  requestdate,
                  suplier_id,
                  building_id,
                  status1
                ];
                let query = await insertquery.schedule_insert(data);
                console.log(query,"query from db");
                let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
                console.log(countstored,"countstored from db");
                var date22 = moment(requestdate).format("YYYY-MM-DD");
                return resolve({
                  result: {
                    message:
                      "Your Buildings are scheduled for service. Please visit booking history for details"
                  }
                });
              }
            } else {
              //Here the date will be incremented until the Building got scheduled for the service*/
              var amountToIncreaseWith = 1;
              sdate = await incrementDate(sdate, amountToIncreaseWith);
              logger.fatal("date increment", sdate);
            }
        }
      }
    }
  });
}
//Here the Date increment logic
async function incrementDate(dateInput, increment) {
  logger.fatal("Date increment function");
  var dateFormatTotime = new Date(dateInput);
  var increasedDate = new Date(
    dateFormatTotime.getTime() + increment * 86400000
  );
  return increasedDate;
}
module.exports = {
  sup: sup
};
