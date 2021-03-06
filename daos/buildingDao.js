var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../mysql_connection/connection");
const query = require("../mysql_connection/queries");
//Here the Data from UI is separated and stored in DATA BASE
function building(buildingobject, email_id) {
  return new Promise(async (resolve, reject) => {

    logger.fatal(buildingobject, "=>buildingobject");
    const address = `${buildingobject.Building_no} || ${buildingobject.address} || ${buildingobject.plot_no}`;
   console.log('address====>',address);

   console.log(buildingobject.alternumber, "=>buildingobject");
    var params = [email_id, buildingobject.type, address,buildingobject.alternumber,buildingobject.Buildingname, buildingobject.lat, buildingobject.lon, buildingobject.cdccn, buildingobject.AMC, buildingobject.NSP, buildingobject.SPCN]
    mysqlConnection
      .insert_query(query.addbuilding, params)
      .then(function (result,err) {
        if (err) {
          console.log("something", err);
          logger.fatal(err,"db error while inserting building details into building table")
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      });
  })
}
function buildingbyemail(email_id) {
  return new Promise(async (resolve, reject) => {
    //var params = [email_id]
    mysqlConnection
      .query_execute(query.getbuildingsbyemail, email_id)
      .then(function (result,err) {
        if (err) {
          console.log("something", err);
          logger.fatal(err,"db error while inserting building details into building table")
          return resolve({ status: 400, err: err });
        } else {
          console.log(result,"in daos 38");
          return resolve({ status: 200, result:result.data });
        }
      });
  })
}
async function not_interested_aman(email_id) {
  return new Promise(async function (resolve, reject) {
    var params = ["NoInterest", email_id]
    /*==================Selecting employee data from employee_profile table=================*/
    var res1 = await mysqlConnection
      .query_execute(query.not_interested_aman, params)
    console.log("")
    /*===================db error capturing====================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the no_interest by email id in the where clause")
      return reject({
        status: 400,
        message: "something went wrong"
      })
    } else {
      return resolve({
        status: 200,
        message: res1
      });
    }
    //});
  });
}
function mysqlinfo(building_id) {
  return new Promise(async (resolve, reject) => {
    //var params = [email_id]
    mysqlConnection
      .query_execute(query.get_bc_view, building_id)
      .then(function (result,err) {
        if (err) {
          console.log("something", err);
          logger.fatal(err,"db error while inserting building details into building table")
          return resolve({ status: 400, err: err });
        } else {
          console.log(result,"in daos 38");
          return resolve({ status: 200, result:result.data });
        }
      });
  })
}
function order_id_select_aman() {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.order_id_select_aman, [])

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      console.log(res1.data[0].num,"in dao")
      return resolve({
        result: res1
      });
    }
  });

}
async function update_order_id_aman(order_id, email_id) {
  return new Promise(async function (resolve, reject) {
    console.log("email", email_id);
    var params = [order_id, email_id]
    /*===============selecting saftery officer category=====================*/
    //for(i=0;i<email_id.length;i++){
    var res1 = await mysqlConnection
      .query_execute(query.update_order_id_aman, params)
    console.log(res1, "database result")
    // }

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while update the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      return resolve({
        result: res1
      });
    }
  });

}

function building_owner_email_id(building_id) {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.building_owner_email_id, [building_id])

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      return resolve({
        result: res1
      });
    }
  });

}
function building_owner_name(email) {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.building_owner_name, [email])

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      return resolve({
        result: res1
      });
    }
  });

}
function supplier_name(supplier_id) {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.supplier_name, [supplier_id])

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      return resolve({
        result: res1
      });
    }
  });

}
function status_update(schedule_id) {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.status_update, [schedule_id])

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      return resolve({
        result: res1
      });
    }
  });

}
function pdf_insert1(supplier_id,
  schedule_id,
  building_id,
  PC,
FA,
SC,
TS,  
TL,  
FPP, 
FAS,
FPF, 
FAR,
D1v,
  D2v,
  D3v,
  D4v,
  D5v,
  D6v,
  D7v,
  D8v,
  D9v,
  signalcheckedv,
  timesignalcheckedv,
  timearrivedv,
  timeleftv,
  BRAND,
  telno,
  simno) {
  return new Promise(async function (resolve, reject) {
    /*===============selecting saftery officer category=====================*/
    var res1 = await mysqlConnection
      .query_execute(query.pdf_values_insert, [
        PC,
FA,
SC,
TS,  
TL,  
FPP, 
FAS,
FPF, 
FAR,
        D1v,
        D2v,
        D3v,
        D4v,
        D5v,
        D6v,
        D7v,
        D8v,
        D9v,
        signalcheckedv,
        timesignalcheckedv,
        timearrivedv,
        timeleftv,
        BRAND,
        telno,
        simno,
        schedule_id])
        console.log(res1,"---------------")

    /*======================db error catpturing===========================*/
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while selecting the order_id")
      return reject({
        err: "something went wrong"
      })
    } else {
      console.log(res1,"inside dao")
      return resolve({
        result: res1
      });
    }
  });

}

module.exports = {
  building: building,
  not_interested_aman: not_interested_aman,
  order_id_select_aman: order_id_select_aman,
  update_order_id_aman: update_order_id_aman,
  buildingbyemail:buildingbyemail,
  building_owner_email_id : building_owner_email_id,
  pdf_insert1 : pdf_insert1,
  supplier_name :supplier_name,
  building_owner_name : building_owner_name,
  status_update :status_update

}



