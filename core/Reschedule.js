/*
Manoj Savaram
*/
let insertquery = require('../daos/scheduleDao');
var supplier = require('../daos/getsupplierlist');
var auto = require('../daos/autoDao');
var t = ["8-10 am", "10-12 am","12-2 pm","2-4 pm","4-6 pm"];
let moment = require('moment');
const checktoken = require("../utils/checkToken");
const Reschedules = require("../daos/RescheduleDao");
var data;
let now = new Date();
async function Rescheduleadmin(email_id) {
    console.log("core=====>",now)
    //const idate = now;
    let sdate = moment(now).format("YYYY-MM-DD");
   // console.log("rdate", rdate);
    return new Promise(async function(resolve, reject) {
//       //verification of token
//       var verifytoken = await checktoken.checkToken(token);
//   if (verifytoken.status == 402) {
//     return resolve({
//       status: verifytoken.status,
//       message: verifytoken.message
//     });
//   } else if (verifytoken.status == 403) {
//     return resolve({
//       status: verifytoken.status,
//       message: verifytoken.message
//     });
//   }
//   else
  {
   var availability= [];
     var time =[];
     var date =[]; 
    
 
   {
   var max=await maximumDate(now)
  // var max1= moment(max).format("YYYY-MM-DD");
   console.log("maxxxxx",max)
     //if requested slot is not available enter into auto assign logic
     for (sdate;sdate < max; sdate = await incrementDate(sdate)) {

            for (var i = 0; i < t.length; i++) {

                    console.log(t[i]);
                    var result = await auto.auto(t[i], email_id, sdate)
                    if (result.result.length == 0 ) {
                        console.log("35", result.result.length);
                            console.log("sadet and max date",sdate,max,sdate!=max);
                            console.log("assigned time", t[i]);
                            var schedule_time = t[i];
                            console.log("schedule time",schedule_time);
                            var suplier_id = email_id;
                            console.log("suplier_id===>",suplier_id);
                            var requestdate = sdate;
                            var date22 = moment(requestdate).format("YYYY-MM-DD");
                           
                             data ={
                                dat : date22,
                                time : t[i]
                            }
                            availability.push(data)
                            
                    } 
                               }
                               
            console.log("after time",availability);

            
      
    }
        console.log("after sup",availability);
        return resolve({
            status: 200,
            result: availability
                });
        }
      }
   })
 }

async function maximumDate(dateInput) {
    console.log("increment func")
    var dateFormatTotime = new Date(dateInput);
    var maxDate = new Date(dateFormatTotime.getTime() + (30 * 86400000));
    var maxx = moment(maxDate).format("YYYY-MM-DD");
    return maxx;
}
 //Date incrementation logic
 async function incrementDate(dateInput) {
    console.log("increment func")
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (1 * 86400000));
    var maxe = moment(increasedDate).format("YYYY-MM-DD");
    return maxe;
}
module.exports = {
    Rescheduleadmin: Rescheduleadmin,
}