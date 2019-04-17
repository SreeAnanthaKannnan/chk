/*
Manoj Savaram
*/
let insertquery = require('../daos/scheduleDao');
var supplier = require('../daos/getsupplierlist');
var auto = require('../daos/autoDao');
var t = ["8-10 am", "10-12 am","12-2 pm","2-4 pm","4-6 pm"];
let moment = require('moment');
const checktoken = require("../utils/checkToken");
async function sup(time, rdate, building_id,token) {
    const idate = rdate;
    let sdate = rdate;
    console.warn("rdate", rdate);
    return new Promise(async function(resolve, reject) {
      //verification of token
      var verifytoken = await checktoken.checkToken(token);
  if (verifytoken.status == 402) {
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
  else{
        console.warn("rdate", idate);
        var suparray = [];
        //Here we are fecthing latest installers list from the DataBase and stored in an array
        var sup = await supplier.supplier();
        console.log("sup",sup);
        suparray.push(sup.result[0].email_id)
        console.log("supplier", suparray);
        //checking the availability of requted slot
        var result2 = await auto.auto(time,suparray[0],idate)
        if (result2.result == 0) {
            console.log("assigned req date");
            var schedule_time = time;
            var suplier_id = suparray[0];
            var requestdate = idate;
            var status1 = "open";
            var countvalue = sup.result[0].countvalue + 1;
            console.log(status1);
            let data = [schedule_time, requestdate, suplier_id, building_id, status1]
            let query = await insertquery.schedule_insert(data);
            console.log("query",query);
            let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
            console.log("countstored",countstored);
            var date22 = moment(requestdate).format("YYYY-MM-DD");  
return resolve({
                result: {
        "message":"Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time +"   As requested slot is available"

                }

            })
   } 
   else {
     //if requested slot is not available enter into auto assign logic
            for (var i = 0; i < t.length; i++) {
                    console.log(t[i]);
                    var result = await auto.auto(t[i], suparray[0], sdate)
                    if (result.result.length == 0) {
                        console.log("35", result.result.length);
                        if (result.result.length != suparray.length) {
                            console.log("assigned time", t[i]);
                            var schedule_time = t[i];
                            var suplier_id = suparray[0];
                            var requestdate = sdate;
                            var countvalue = sup.result[0].countvalue + 1;
                            console.log("assigned to", suparray[0]);
                            var status1 = "open";
                            console.log("date", sdate);
                            let data = [schedule_time, requestdate, suplier_id, building_id,status1]
                            let query = await insertquery.schedule_insert(data)
                            let countstored = await insertquery.update_countvalue(countvalue,sup.result[0].email_id)
			var date22 = moment(requestdate).format("YYYY-MM-DD");                            
                return resolve({
            result: {
        "message":"Your Building is Scheduled for service on" + " " + date22 + " " + schedule_time +"   As requested slot is unavailable"
                    }
                            });
                        }

                    } 
                    
                    else {
                        var amountToIncreaseWith = 1;
                        sdate = await incrementDate(sdate, amountToIncreaseWith);
                        console.log("d increment", sdate);
                    }
                
            }
        }
      }
   })
 }
 //Date incrementation logic
async function incrementDate(dateInput, increment) {
    console.log("increment func")
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
}
module.exports = {
    sup: sup,
}