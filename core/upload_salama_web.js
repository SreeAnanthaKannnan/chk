var express = require("express");
var multer = require("multer");

var fs = require("fs");

var formidable = require("formidable");
var csvParser = require("csv-parse");
var cm = require("csv-mysql");
const translate = require("../utils/translate");
//const { getJsDateFromExcel } = require("excel-date-to-js");

// const con = require("../Mysql_config/DBConfig");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const Employee_profileDao = require("../daos/Employee_profileDao");
const Employee = require("../daos/Employee_profileDao");
const checktoken = require("../utils/checkToken");
let moment = require("moment");
var xlsx = require("node-xlsx");
var dateFormat = require("dateformat");
// var app = express();
var count = 0;
var length = 0;

function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  var fractional_day = serial - Math.floor(serial) + 0.0000001;
  var total_seconds = Math.floor(86400 * fractional_day);
  var seconds = total_seconds % 60;
  total_seconds -= seconds;
  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}

function upload_salama_web(
  filepath,
  token,
  language,
  trade_license_number,
  hr_email
) {
  console.log("body ", token);
  return new Promise(async function (resolve, reject) {
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
      console.log(filepath);

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
        console.log("sheet_name", sheet_name_list);
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
                console.log("length", data.length);
                for (i = 0; i < data.length; i++) {
                  console.log("data_select.......", data[i]);
                  var select_record = await Employee.Employee_select(
                    data[i]["Emirates ID"]
                  );

                  // data[i].Empty = "NO";
                  console.log("select_record", select_record);
                  if (select_record.message.data.length == 0) {
                    console.log(data[i]);

                    // var test = Object.values(data[0]);

                    // console.log(params[0][7],"params====>")
                    // params[0][7]=params[0][8]
                    // console.log(params[0][8],"paramsss [8}")
                    //  params[0][8]="NO"
                    var fname=(data[i]["First Name"])
                    var lname=(data[i]["Last Name"])
                    if(fname==undefined || lname==undefined|| fname=="" || lname==""){
                      var name_en=data[i]["First Name"] + "||" + "";
                      var name_en=data[i][""+"||"+""]
                    }
                    else{
                    var name_en =
                      data[i]["First Name"] + "||" + data[i]["Last Name"];

                    }
                    var name_arabic = await translate.translate_ar(name_en);
                    name_ar = name_arabic.result;

                    data[i].name_en = name_en;
                    data[i].name_ar = name_ar;
                    data[i].hr_email = hr_email;
                    data[i].trade_license_number = trade_license_number;

                    // data[0].name_ar = name_ar;
                    delete data[i]["First Name"];
                    delete data[i]["Last Name"];
                    console.log(
                      "Conversion",
                      ExcelDateToJSDate(data[i]["Preferred Schedule"])
                    );
                    data[i]["Preferred Schedule"] = ExcelDateToJSDate(
                      data[i]["Preferred Schedule"]
                    );
                    var date_created = dateFormat("yyyy-mm-dd HH:MM:ss");

                    data[i].date_created = date_created;
                    // console.log(
                    //moment(data[i]["Preferred Schedule"]).format("YYYY-MM-DD")
                    //);

                    // data[i]["trade_license_number"] = trade_license_number;
                    var test = Object.values(data[i]);
                    console.log("test", hr_email);
                    console.log("test", trade_license_number);
                    console.log("test..........", test);
                    var insert_employee = await Employee_profileDao.Employee_insert(
                      test
                    );

                    console.log(
                      "insert",
                      insert_employee.message.data.affectedRows
                    );
                    // count + 1;
                    if (insert_employee.message.data.affectedRows != 0) {
                      count++;
                      console.log("count numb======>", count);
                    }
                  } else if (select_record.message.data.length != 0) {
                    length++;
                    console.log("length numb======>", length);
                  }
                }
                return resolve({
                  // statuscode: "E08",
                  status: 200,
                  message:
                    count +
                    " employee records were captured and " +
                    length +
                    " employee records were found to be duplicate."
                });
              } else {
                return resolve({
                  // statuscode: "E08",
                  status: 400,
                  message: "Records not found in Employee List.xlsx File"
                });
              }
            }
          } else if (y == "قائمة الموظفين ") {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            {
              for (z in worksheet) {
                if (z[0] === "!") continue;
                //console.log(z,"zvalue")
                //parse out the column, row, and value
                var tt = 0;
                //console.log(z,"column")
                //console.log(z.length,"column")
                for (var i = 0; i < z.length; i++) {
                  if (!isNaN(z[i])) {
                    tt = i;
                    break;
                  }
                }
                var col = z.substring(0, tt);
                //console.log(col,"column")
                var row = parseInt(z.substring(tt));
                //console.log("rowcount",row)
                var value = worksheet[z].v;

                //store header names
                if (row == 1 && value) {
                  headers[col] = value;
                  continue;
                }
                console.log("value", value);
                if (!data[row]) data[row] = {};
                if (value == "") break;
                data[row][headers[col]] = value;
              }
              // console.log("rowcount",row)
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
              }
              else if (data.length != 0) {
                console.log("length", data.length);
                for (i = 1; i < data.length - 1; i++) {
                  if (data[i] != undefined) {
                    console.log("data_select.......", data[i]);
                    var select_record = await Employee.Employee_select(
                      data[i]["Emirates ID"]
                    );
                    // data[i].Empty = "NO";
                    console.log("select_record", select_record);
                    if (select_record.message.data.length == 0) {
                      console.log(data[i]);

                      // var test = Object.values(data[0]);

                      // console.log(params[0][7],"params====>")
                      // params[0][7]=params[0][8]
                      // console.log(params[0][8],"paramsss [8}")
                      //  params[0][8]="NO"
                      var name_ar =
                        data[i]["First Name"] + "||" + data[i]["Last Name"];
                      var name_english = await translate.translate_en(name_ar);
                      name_en = name_english.result;

                      data[i].name_en = name_en;
                      data[i].name_ar = name_ar;
                      data[i].hr_email = hr_email;
                      data[i].trade_license_number = trade_license_number;

                      // data[0].name_ar = name_ar;
                      delete data[i]["First Name"];
                      delete data[i]["Last Name"];
                      delete data[i]["undefined"];
                      console.log(
                        "Conversion",
                        ExcelDateToJSDate(data[i]["Preferred Schedule"])
                      );
                      data[i]["Preferred Schedule"] = ExcelDateToJSDate(
                        data[i]["Preferred Schedule"]
                      );
                      var date_created = dateFormat("yyyy-mm-dd HH:MM:ss");

                      data[i].date_created = date_created;
                      // console.log(
                      //moment(data[i]["Preferred Schedule"]).format("YYYY-MM-DD")
                      //);

                      // data[i]["trade_license_number"] = trade_license_number;
                      var test = Object.values(data[i]);
                      console.log("test", hr_email);
                      console.log("test", trade_license_number);
                      console.log("test..........", test);
                      var insert_employee = await Employee_profileDao.Employee_insert(
                        test
                      );

                      console.log(
                        "insert",
                        insert_employee.message.data.affectedRows
                      );
                      // count + 1;
                      if (insert_employee.message.data.affectedRows != 0) {
                        count++;
                        console.log("count numb======>", count);
                      }
                    } else if (select_record.message.data.length != 0) {
                      length++;
                      console.log("length numb======>", length);
                    }
                  }
                }
                return resolve({
                  // statuscode: "E08",
                  status: 200,
                  message:
                    count +
                    " تم تسجيل سجلات الموظفين و " +
                    length +
                    " تم العثور على سجلات الموظفين لتكون مكررة."
                });
              }
              else {
                return resolve({
                  // statuscode: "E08",
                  status: 400,
                  message: "السجلات ليست في ملف Employee List.xlsx"
                });
              }
            }
          }
          count = 0;
          length = 0;
        });
      });
    }
  });
}

module.exports = {
  upload_salama_web: upload_salama_web
};

