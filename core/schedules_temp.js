
const checktoken = require("../utils/checkToken");
const buildingDao = require("../daos/buildingDao");
var insertquery = require("../daos/scheduleDao");

async function sup_temp(time, rdate, building_id,token) {
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
    var getorder = await buildingDao.order_id_select_aman()
        console.log(getorder,"getorder");
        console.log(getorder.result.data[0], "order_id_select=====>")
        var orderid = getorder.result.data[0].num
        console.log(orderid, "ORDER")
        console.log(orderid == "null")
        if (orderid == "null" || orderid == "NULL" || orderid == "NoInterest") {
            orderid = "A0001"
        }
        else {
            console.log(orderid, "inside the loop")
            // orderid = Number(orderid) + 1
            console.log("orderid" + orderid)
            orderid = orderid + 1;
            console.log("orderid=====>" + orderid)

            orderid = orderid.toString()
            if (orderid.length == 1) {
                orderid = "A000" + orderid
            }
            else if (orderid.length == 2) {
                orderid = "A00" + orderid
            }
            else if (orderid.length == 3) {
                orderid = "A0" + orderid
            }
            else {
                orderid = "A" + orderid
            }
        }
        var preschedule = rdate + " "+ time ;
        var status1 = "Order Raised";
        var data = [preschedule,orderid,status1,building_id];
        let query = await insertquery.schedule_insert_temp(data);
        if(query.affectedRows!=0){
            return resolve({
                orderid:orderid,
                "message":"Order Placed Successfully"
            })
        }
        else{
            return reject({
                status:500,
                message:"Internal server error!"
            })
        }

        
    }
})
} 
async function sup_bulk_temp(time, rdate, building_id,token) {
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
   
       
        var preschedule = rdate + " "+ time ;
        var status1 = "Order Raised";
        var data = [preschedule,orderid,status1,building_id];
        let query = await insertquery.schedule_insert_temp(data);
        if(query.affectedRows!=0){
            return resolve({
                orderid:orderid,
                "message":"Order Placed Successfully"
            })
        }
        else{
            return reject({
                status:500,
                message:"Internal server error!"
            })
        }

        
    }
})
} 
module.exports = {
    sup_temp: sup_temp,
    sup_bulk_temp:sup_bulk_temp
}