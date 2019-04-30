var express = require("express");
var multer = require("multer");

var fs = require("fs");

var formidable = require("formidable");
var csvParser = require("csv-parse");
var cm = require("csv-mysql");
// const con = require("../Mysql_config/DBConfig");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const Employee_profileDao = require("../daos/Employee_profileDao");
const Employee = require("../daos/Employee_profileDao");
const checktoken = require("../utils/checkToken");

var xlsx = require("node-xlsx");
// var app = express();
var count = 0;
var length = 0;
function request_service(filepath, filename, token) {
  console.log("body ", token);
  return new Promise(
    async function (resolve, reject) {
      var verifytoken = await checktoken.checkToken(token);
      if (verifytoken.status == 405) {
        return resolve({
          status: verifytoken.status,
          message: verifytoken.message
        });
      } else if (verifytoken.status == 403) {
        console.log("session expired");
        return resolve({
          status: verifytoken.status,
          message: verifytoken.message
        });
      } else {
        //   console.log(filepath);
        await Employee_profileDao.not_interested();

        await fs.readFile(filepath, { encoding: "utf-8" }, async function (
          err,
          data
        ) {
          if (err) {
            throw err;
          }
          var XLSX = require("xlsx");
          var workbook = XLSX.readFile(filepath);
          var sheet_name_list = workbook.SheetNames;

          sheet_name_list.forEach(async function (y) {
            if (y == "Employee List") {
              var worksheet = workbook.Sheets[y];
              var headers = {};
              var data = [];
              {
                for (z in worksheet) {
                  if (z[0] === "!") continue;
                  //parse out the column, row, and value
                  var tt = 0;
                  for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                      tt = i;
                      break;
                    }
                  }
                  var col = z.substring(0, tt);
                  var row = parseInt(z.substring(tt));
                  var value = worksheet[z].v;

                  //store header names
                  if (row == 1 && value) {
                    headers[col] = value;
                    continue;
                  }

                  if (!data[row]) data[row] = {};
                  data[row][headers[col]] = value;
                }
                data.shift();
                data.shift();
                var params = [];

                if (err) {
                  var error = {
                    // statuscode: "E08",
                    status: 500,
                    message: "Something went wrong"
                  };
                  throw error;
                } else if (data.length != 0) {
                  var national_id_array = [];

                  console.log("length", data.length);
                  for (i = 0; i < data.length; i++) {
                    console.log("data", data[i]);
                    national_id_array.push(data[i]["Emirates ID"]);
                  }
                  Employee_profileDao.order_id_select()
                
                  .then(async function (result) 
                  {
                    console.log(result.result.data[0]);
                    var order_id = result.result.data[0].num;
                    var order_array = [];

                    console.log(order_id, "ORDER");
                    console.log(order_id == "null");
                    if (
                      order_id == "null" ||
                      order_id == "NULL" ||
                      order_id == "NoInterest"
                    ) {
                      order_id = "S0001";
                    } else {
                      console.log(order_id, "inside1 the loop");
                      order_id = order_id + 1;
                      order_id = order_id.toString();
                      console.log(order_id, "in line 142");
                      if (order_id.length == 1) {
                        order_id = "S000" + order_id;
                      } else if (order_id.length == 2) {
                        order_id = "S00" + order_id;
                      } else if (order_id.length == 3) {
                        order_id = "S0" + order_id;
                      } else {
                        order_id = "S" + order_id;
                      }
                    }

                    console.log(national_id_array, "=======>national_id_array");
                    var res = await Employee_profileDao.emirates(national_id_array[0])
                    console.log(res.message[0].order_id,"in 133")
                        if(res.message[0].order_id=="NoInterest" || res.message[0].order_id=="null" || res.message[0].order_id=="NULL")
                    {

                    await Employee_profileDao.update_order_id(
                      order_id,
                      national_id_array
                    );
                    }
                    else{
                      return resolve({
                        // statuscode: "E08",
                        status: 400,
                        message: "Already order raised"
                      });

                    }
                    return resolve({
                      // statuscode: "E08",
                      status: 200,
                      message: {
                        order_id: order_id
                      }
                    });

                    //}
                  } )
                  // else {
                  //   var err = {
                  //     status: 400,
                  //     message: err
                  //   };
                  //   return resolve(err);
                  // }
                  /*=========Error Capturing===========*/

                  .catch(async function(err) {
                    return resolve({
                      status: 400,
                      message: err
                    });
                  })
                
                }
              }
            } else if (y == "قائمة الموظفين ") {
              var worksheet = workbook.Sheets[y];
              var headers = {};
              var data = [];
              {
                for (z in worksheet) {
                  if (z[0] === "!") continue;
                  //parse out the column, row, and value
                  var tt = 0;
                  for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                      tt = i;
                      break;
                    }
                  }
                  var col = z.substring(0, tt);
                  var row = parseInt(z.substring(tt));
                  var value = worksheet[z].v;

                  //store header names
                  if (row == 1 && value) {
                    headers[col] = value;
                    continue;
                  }

                  if (!data[row]) data[row] = {};
                  if (value == "") break;
                  data[row][headers[col]] = value;
                }
                // co
                data.shift();
                data.shift();
                var params = [];

                if (err) {
                  var error = {
                    // statuscode: "E08",
                    status: 500,
                    message: "Something went wrong"
                  };
                  throw error;
                } else if (data.length != 0) {
                  var national_id_array = [];

                  console.log("length", data.length);
                  for (i = 0; i < data.length; i++) {
                    console.log("data===>", data[i]);
                    if (data[i] != undefined) {
                      console.log("data_select.......", data[i]);
                      national_id_array.push(data[i]["Emirates ID"]);
                    }
                  }

                  await Employee_profileDao.order_id_select()
                    .then(async function (result) {
                      console.log(result.result.data[0]);
                      var order_id = result.result.data[0].num;
                      var order_array = [];

                      console.log(order_id, "ORDER");
                      console.log(order_id == "null");
                      if (
                        order_id == "null" ||
                        order_id == "NULL" ||
                        order_id == "NoInterest"
                      ) {
                        order_id = "S0001";
                      } else {
                        console.log(order_id, "inside1 the loop");
                        order_id = order_id + 1;
                        order_id = order_id.toString();
                        console.log(order_id, "in line 142");
                        if (order_id.length == 1) {
                          order_id = "S000" + order_id;
                        } else if (order_id.length == 2) {
                          order_id = "S00" + order_id;
                        } else if (order_id.length == 3) {
                          order_id = "S0" + order_id;
                        } else {
                          order_id = "S" + order_id;
                        }
                      }
                      // console.log("order_id",order_id);
                      // for (var i = 0; i < 6; i++)
                      //   order_id += possible.charAt(Math.floor(Math.random() * possible.length));
                      // console.log("order_id" + order_id);
                      //console.log(national_id_array, "=======>national_id_array")
                      var res = await Employee_profileDao.emirates(national_id_array[1])
                      console.log(res,"in 266")
                          if(res.message[0].order_id=="NoInterest" || res.message[0].order_id=="null" || res.message[0].order_id=="NULL")
                      {
                      await Employee_profileDao.update_order_id(
                        order_id,
                        national_id_array
                      );
                      }
                      else{
                        return resolve({
                          // statuscode: "E08",
                          status: 400,
                          message: "طلب مرفوع بالفعل"
                        });
  
                      }
                      return resolve({
                        // statuscode: "E08",
                        status: 200,
                        message: {
                          order_id: order_id
                        }
                      });

                      //}
                    })
                    /*=========Error Capturing===========*/

                    .catch(async function (err) {
                      return resolve({
                        status: 400,
                        message: err
                      });
                    });
                }
              }
            }
          });
        });
      }
    }
    //}
  );
}

module.exports = {
  request_service: request_service
};