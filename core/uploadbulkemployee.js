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
// var app = express();
var count = 0;
var length = 0;
function uploadbulkemployee(filepath, email_id) {
  // console.log("body " + req.body);
  return new Promise(async function(resolve, reject) {
    console.log(filepath);

    await fs.readFile(filepath, { encoding: "utf-8" }, async function(
      err,
      csvData
    ) {
      if (err) {
        throw err;
      }
      var linesExceptFirst = csvData
        .split("\n")
        .slice(1)
        .join("\n");
      fs.writeFile(filepath, linesExceptFirst);
      await csvParser(linesExceptFirst, { delimiter: "," }, async function(
        err,
        data
      ) {
        if (err) {
          var error = {
            // statuscode: "E08",
            status: 500,
            message: "Something went wrong"
          };
          throw error;
        } else {
          console.log("length", data[0].length);
          for (i = 0; i < data.length; i++) {
            console.log("data", data[i]);
            var select_record = await Employee.Employee_select(data[i][4]);
            console.log("select_record", select_record);
            if (select_record.message.data.length == 0) {
              console.log(data[i]);
              var insert_employee = await Employee_profileDao.Employee_insert(
                data[i]
              );
              console.log("insert", insert_employee.message.data.affectedRows);
              // count + 1;
              if (insert_employee.message.data.affectedRows != 0) {
                count++;
                console.log("count numb======>", count);
              }
              // count = 0;

              // if (insert_employee.message.data.affectedRows != 0) {
              //   var read_record = await Employee.Employee_select("National_Id");
              //   console.log("read_record", read_record);
              //   if (read_record.message.data.length != 0) {
              //     var delete_employee = await Employee.delete_Employee(
              //       read_record.message.data[0].National_Id
              //     );
              //     console.log("deleterecord", delete_employee);
              //   }

              //   // } else {
              //   //   return resolve({
              //   //     // statuscode: "E08",
              //   //     status: 404,
              //   //     message: "User has already exists"
              //   //   });
              //   // }
              // }
            } else if (select_record.message.data.length != 0) {
              // length + 1;
              length++;
              console.log("length numb======>", length);

              // length = 0;
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
        }
      });
      count = 0;
      length = 0;
    });
  });
}

module.exports = {
  uploadbulkemployee: uploadbulkemployee
};
