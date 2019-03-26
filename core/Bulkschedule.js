/* 
@ Manoj savaram
*/

let insertquery = require('../daos/scheduleDao');
var supplier = require('../daos/getsupplierlist');
var auto = require('../daos/autoDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
//Here the time slots which are available stored in an array
var t = ["8-10 am", "11-12 am", "12-2 pm", "2-4 pm", "4-6 pm", "6-8 pm", "8-10 pm"];
let moment = require('moment');
const checktoken = require("../utils/checkToken")

async function sup(time, rdate, building_id, token) {
    const idate = rdate;
    let sdate = rdate;

    console.warn("rdate", rdate);
    return new Promise(async function (resolve, reject) {

        console.warn("rdate", idate);
        /*============================Token Validation========================================*/
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 402) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        } else if (verifytoken.status == 403) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        } else {
            var suparray = [];
            //Here we are fecthing latest installers list from the DataBase and stored in an array*/ 
            var sup = await supplier.supplier();
            for (var i = 0; i < sup.result.length; i++) {
                logger.fatal("supplier list", sup.result[i].email_id);
                suparray.push(sup.result[i].email_id)
            }
            logger.fatal("supplier", suparray);
            //Here we check the preferred time slot is available for the Building owner*/
            var result2 = await auto.auto1(time, idate)

            if (result2.result == 0) {
                logger.fatal("assigned req date");
                var schedule_time = time;
                var suplier_id = suparray[0];
                var requestdate = idate;
                var status1 = "open";
                let data = [schedule_time, requestdate, suplier_id, building_id, status1]
                let query = await insertquery.schedule_insert(data)
                var date22 = moment(requestdate).format("YYYY-MM-DD");
                //if the requested time slot available,schedule the building for installation*/
                return resolve({
                    result: {
                        "message": "Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time + "   As requested slot is available"

                    }
                })
            } else {
                //if preferred time slot unavilable we assign the next available slot for the Building*/
                for (var i = 0; i < t.length; i++) {
                    for (var j = 0; j < suparray.length; j++) {
                        logger.fatal(t[i]);
                        var result = await auto.auto(t[i], suparray[j], sdate)

                        if (result.result.length == 0) {
                            logger.fatal("35", result.result.length);

                            if (result.result.length != suparray.length) {

                                logger.fatal("assigned time", t[i]);
                                var schedule_time = t[i];
                                var suplier_id = suparray[j];
                                var requestdate = sdate;
                                logger.fatal("assigned to", suparray[j]);
                                let status1 = "open";
                                logger.fatal("date", sdate);
                                let data = [schedule_time, requestdate, suplier_id, building_id, status1]
                                let query = await insertquery.schedule_insert(data)
                                var date22 = moment(requestdate).format("YYYY-MM-DD");
                                return resolve({
                                    result: {
                                        "message": "done"

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
        }

    })
}
//Here the Date increment logic
async function incrementDate(dateInput, increment) {
    logger.fatal("Date increment function")
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
}
module.exports = {
    sup: sup,

}