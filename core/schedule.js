// let insertquery = require('../Daos/scheduleDao');
// var log4js = require('log4js');
// const logger = log4js.getLogger('Aman_project');
// //const message = require('../Util/messages')
// //const language_detect = require('../Util/language_detect')
//  let date = require('date-and-time');
//  let moment = require('moment')



// exports.schedule =(schedule_time,requestdate1,building_id) =>{

//     return new Promise(async(resolve, reject) => {
//      var scheduledata={
//         //  "id":id,
//         "schedule_time":schedule_time,
//         "requestdate":requestdate1
//      }
//     //  let schedule_time = scheduleobject.schedule_time;
//     // let requestdate = scheduleobject.requestdate;
//    // let today = new Date();
//    //let requestdate = moment(requestdate1).format("YYYY/MM/DD HH:mm:ss");
//    var date = moment(new Date(requestdate1.substr(0, 16)));
//    var requestdate=date.format("YYYY-MM-DD HH:mm:ss");
//     let data =[schedule_time,requestdate,building_id]
//     console.log(data,"query")
//     console.log(requestdate,"schedule date")
//     let query= await insertquery.schedule_insert(data)
//        console.log(query !=0,"data inserted")
     
//        return  resolve({
//         status: 200,
//         message:"Appeal Done",
        
        
//     })
// })
//            };
let insertquery = require('../daos/scheduleDao');
var supplier = require('../daos/getsupplierlist');
var auto = require('../daos/autoDao');
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
            console.log("supplier list", sup.result[i].email_id);
            suparray.push(sup.result[i].email_id)
        }
        console.log("supplier", suparray);

        var result2 = await auto.auto1(time, idate)

        if (result2.result == 0) {
            console.log("assigned req date");
            var schedule_time = time;
            var suplier_id = suparray[0];
            var requestdate = idate;
            let data = [schedule_time, requestdate, suplier_id, building_id]
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
                    console.log(t[i]);
                    var result = await auto.auto(t[i], suparray[j], sdate)

                    if (result.result.length == 0) {
                        console.log("35", result.result.length);

                        if (result.result.length != suparray.length) {

                            console.log("assigned time", t[i]);
                            var schedule_time = t[i];
                            var suplier_id = suparray[j];
                            var requestdate = sdate;
                            console.log("assigned to", suparray[j]);

                            console.log("date", sdate);
                            let data = [schedule_time, requestdate, suplier_id, building_id]
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
                        console.log("d increment", sdate);

                    }

                }
            }
        }
    })
}
async function incrementDate(dateInput, increment) {
    console.log("increment func")
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
}
module.exports = {
    sup: sup,

}
