var asser = require("../daos/assesserview");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
const admindao = require("../daos/admin_Dao");

module.exports = {
  adminapproveddetails: adminapproveddetails,
  adminRejectdetails: adminRejectdetails,
  adminFreezedetails: adminFreezedetails,
  getbuildings: getbuildings,
  getbuildings_month: getbuildings_month,
  getavgOrder: getavgOrder,
  getorder_month: getorder_month,
  getadmin_month: getadmin_month,
  getavgadmin: getavgadmin,
  getapplicationstatistics: getapplicationstatistics
};
//===============Fetching the details from the Daos both building and schedule information=========================================//
function adminapproveddetails(adminApproved, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var emirates_id = adminApproved.emirates_id;
    console.log("emirates_id==core==>>", emirates_id);
    const status = "Approved";

    let owner_details_details = await admindao.adminapproved(
      status,
      emirates_id
    );
    console.log("owner_details_details_core===>", owner_details_details);
    return resolve({
      status: 200,
      message: owner_details_details
    });
    // }
  });
}
//===============Code End===============================================================================================================//
function adminRejectdetails(adminReject, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var emirates_id = adminReject.emirates_id;
    console.log("emirates_id==core==>>", emirates_id);
    const status = "Reject";

    let owner_details_details = await admindao.adminapproved(
      status,
      emirates_id
    );
    console.log("owner_details_details_core===>", owner_details_details);
    return resolve({
      status: 200,
      message: owner_details_details
    });
    // }
  });
}
//===============Code End===============================================================================================================//
function adminFreezedetails(adminFreeze, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var emirates_id = adminFreeze.emirates_id;
    console.log("emirates_id==core==>>", emirates_id);
    const status = "Freeze";

    let owner_details_details = await admindao.adminapproved(
      status,
      emirates_id
    );
    console.log("owner_details_details_core===>", owner_details_details);
    return resolve({
      status: 200,
      message: owner_details_details
    });
    // }
  });
}
//===============Code End===============================================================================================================//
function getbuildings() {
  return new Promise(async (resolve, reject) => {
    var result = await admindao.getavgbuildings();
    console.log("add", result);
    resolve({
      status: 200,
      result: result.result
    });
  });
}
function getavgOrder() {
  return new Promise(async (resolve, reject) => {
    var result = await admindao.getavgorder();
    console.log("add", result);
    resolve({
      status: 200,
      result: result.result
    });
  });
}
function getavgadmin() {
  return new Promise(async (resolve, reject) => {
    var result = await admindao.getavgadmin();
    console.log("add", result);
    resolve({
      status: 200,
      result: result.message
    });
  });
}
function getapplicationstatistics() {
  return new Promise(async (resolve, reject) => {
    var result = await admindao.getavgstatistics();
    console.log("add", result);
    resolve({
      status: 200,
      result: result.result
    });
  });
}

function getbuildings_month(buildings_month, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var buildingmonth = buildings_month.month;
    console.log("buildingmonth", buildingmonth);
    var buildingyear = buildings_month.year;
    console.log("buildingyear", buildingyear);

    const result = await admindao.getbuildingsmonth(
      buildingmonth,
      buildingyear
    );
    console.log("result==core==>", result);
    console.log("status", result.status);

    if (result.status != 200) {
      res.status(400).json({
        status: 400,
        message: "Data Cant Fetch"
      });
    } else {
      var res_data = result.data;
      console.log(
        "number_of_buildings===>:",
        result.data[0].number_of_buildings
      );
      console.log(
        "number_of_building_complaint===>:",
        result.data[0].number_of_building_complaint
      );
      console.log(
        "number_of_building_progress===>:",
        result.data[0].number_of_building_progress
      );

      // var builing_data_list = {
      //     number_of_buildings: result.data[0].number_of_buildings,
      //     number_of_building_complaint: result.data[0].number_of_building_complaint,
      //     number_of_building_progress: result.data[0].number_of_building_progress
      // }
      return resolve({
        status: 200,
        res_data
      });
    }
    // }
  });
}

function getadmin_month(adminmonth, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var adminmonth_list = adminmonth.month;
    console.log("adminmonth_list", adminmonth_list);
    var adminyear = adminmonth.year;
    console.log("adminyear", adminyear);

    const result = await admindao.getadmin_month(adminmonth_list, adminyear);
    console.log("result==core==>", result);
    console.log("status", result.status);

    if (result.status != 200) {
      res.status(400).json({
        status: 400,
        message: "Data Cant Fetch"
      });
    } else {
      var res_data = result.data;
      // console.log("number_of_buildings===>:", result.data[0].number_of_buildings);
      // console.log("number_of_building_complaint===>:", result.data[0].number_of_building_complaint);
      // console.log("number_of_building_progress===>:", result.data[0].number_of_building_progress);

      // var builing_data_list = {
      //     number_of_buildings: result.data[0].number_of_buildings,
      //     number_of_building_complaint: result.data[0].number_of_building_complaint,
      //     number_of_building_progress: result.data[0].number_of_building_progress
      // }
      return resolve({
        status: 200,
        res_data
      });
    }
    // }
  });
}
function getorder_month(order_month, token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message,
    //     });
    // } else if (verifytoken.status == 403) {
    //     return resolve({
    //         status: verifytoken.status,
    //         message: verifytoken.message
    //     });
    // } else {
    var ordermonth = order_month.month;
    console.log("ordermonth", ordermonth);
    var orderyear = order_month.year;
    console.log("orderyear", orderyear);

    const result = await admindao.getOrdersMonth(ordermonth, orderyear);
    console.log("result==core==>", result);
    console.log("status", result.status);

    if (result.status != 200) {
      res.status(400).json({
        status: 400,
        message: "Data Cant Fetch"
      });
    } else {
      var res_data = result.data;
      // console.log("number_of_buildings===>:", result.data[0].number_of_buildings);
      // console.log("number_of_building_complaint===>:", result.data[0].number_of_building_complaint);
      // console.log("number_of_building_progress===>:", result.data[0].number_of_building_progress);

      // var builing_data_list = {
      //     number_of_buildings: result.data[0].number_of_buildings,
      //     number_of_building_complaint: result.data[0].number_of_building_complaint,
      //     number_of_building_progress: result.data[0].number_of_building_progress
      // }
      return resolve({
        status: 200,
        res_data
      });
    }
    // }
  });
}
