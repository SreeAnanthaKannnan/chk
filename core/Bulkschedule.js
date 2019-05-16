/* 
@ Manoj savaram
*/
let insertquery = require("../daos/scheduleDao");
var supplier = require("../daos/getsupplierlist");
var auto = require("../daos/autoDao");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const buildingDao = require("../daos/buildingDao");
var bc = require("../fabcar/javascript/invoke");
//Here the time slots which are available stored in an array
var t = [
  "8-10 am",
  "10-12 am",
  "12-2 pm",
  "2-4 pm",
  "4-6 pm"
];
let moment = require("moment");
async function sup(time, rdate, building_id,orderid) {
  const idate = rdate;
  let sdate = rdate;
  console.warn("rdate", rdate);
  return new Promise(async function (resolve, reject) {
    console.warn("rdate", idate);
    /*============================Token Validation========================================*/
        var suparray = [];
      //Here we are fecthing latest installers list from the DataBase and stored in an array*/
      var sup = await supplier.supplier();
      
       console.log("supplier list", sup.result[0].email_id);
        suparray.push(sup.result[0].email_id);
      
      console.log("supplier", suparray);
      //Here we check the preferred time slot is available for the Building owner*/
      var result2 = await auto.auto(time,suparray[0],idate)
      console.log(result2,"in 35 of core bulk");
        if (result2.result == 0) {
            console.log("assigned req date");
            var schedule_time = time;
            var suplier_id = suparray[0];
            var requestdate = idate;
            var status1 = "open";
            var countvalue = sup.result[0].countvalue + 1;
            let data = [schedule_time, requestdate, suplier_id, building_id, status1,orderid]
            let data2 = [requestdate,orderid,status1,building_id]
            console.log(data2,"data2");
            let query = await insertquery.schedule_insert(data);
            console.log("query",query);
            let query1 = await insertquery.schedule_insert_temp(data2);
            let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
            // let mysqldata = await buildingDao.mysqlinfo(orderid);
            // console.log(mysqldata,"mysqldata");
            // console.log(orderid,"mysqldata");
            //                 var key =orderid;
            //                 var params = {
            //                     id:key,
            //                     fun: "create",
            //                     data: mysqldata.result[0]
            //                   };
            //                   var blockchainresponse = await bc.main(params)
            //                   console.log(blockchainresponse,"blockchainres");
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
            
            if (result.result.length == 0) {
              if (result.result.length != suparray.length) {
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
                  status1,
                  orderid
                ];
                let data2 = [requestdate,orderid,status1,building_id]
                console.log(data2,"data2");
                let query = await insertquery.schedule_insert(data);
                console.log("query",query);
                let query1 = await insertquery.schedule_insert_temp(data2);
                console.log(query,"query from db");
                let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
                console.log(countstored,"countstored from db");
                // let mysqldata = await buildingDao.mysqlinfo(orderid);
                // console.log(mysqldata,"mysqldata");
                // console.log(orderid,"mysqldata");
                //                 var key =orderid;
                //                 var params = {
                //                     id:key,
                //                     fun: "create",
                //                     data: mysqldata.result[0]
                //                   };
                //                   var blockchainresponse = await bc.main(params)
                //                   console.log(blockchainresponse,"blockchainres");
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
