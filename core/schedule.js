
let insertquery = require('../daos/scheduleDao');
var supplier = require('../daos/getsupplierlist');
var auto = require('../daos/autoDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
var t = ["8-10 am", "11-12 am","12-2 pm","2-4 pm","4-6 pm","6-8 pm","8-10 pm"];
//var s=["a@a.com","b@a.com"];
let moment = require('moment');
async function sup(time, rdate, building_id) {
    const idate = rdate;
    let sdate = rdate;

    console.warn("rdate", rdate);
    return new Promise(async function(resolve, reject) {

        console.warn("rdate", idate);
        var suparray = [];
        var sup = await supplier.supplier();
        for (var i = 0; i < sup.result.length; i++) {
            logger.fatal("supplier list", sup.result[i].email_id);
            suparray.push(sup.result[i].email_id)
        }
        logger.fatal("supplier", suparray);

        var result2 = await auto.auto1(time, idate)

        if (result2.result == 0) {
            logger.fatal("assigned req date");
            var schedule_time = time;
            var suplier_id = suparray[0];
            var requestdate = idate;
            let status1="open";
            let data = [schedule_time, requestdate, suplier_id, building_id,status1]
            let query = await insertquery.schedule_insert(data)
        var date22 = moment(requestdate).format("YYYY-MM-DD");    
	return resolve({
                result: {
                                        "message":"Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time +"   As requested slot is available"

                }
            })
        } else {
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
                            let status1="open";
                            logger.fatal("date", sdate);
                            let data = [schedule_time, requestdate, suplier_id, building_id,status1]
                            let query = await insertquery.schedule_insert(data)
			var date22 = moment(requestdate).format("YYYY-MM-DD");                            
return resolve({
                                result: {
                                                                      "message":"Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time +"   As requested slot is unavailable"

                                }
                            });
                        }

                    } else {
                        var amountToIncreaseWith = 1;
                        sdate = await incrementDate(sdate, amountToIncreaseWith);
                        logger.fatal("d increment", sdate);

                    }

                }
            }
        }
    })
}
async function incrementDate(dateInput, increment) {
    logger.fatal("increment func")
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
}
module.exports = {
    sup: sup,

}
