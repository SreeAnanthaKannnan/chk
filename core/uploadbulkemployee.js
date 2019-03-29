/**
 * @author: Manoj V
 * @version: 1.0.0
 * @date: March 05, 2019
 * @description: This would be the core file where all the API definitions and implementations are described.
 */
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
const checktoken = require("../utils/checkToken");

function uploadbulkemployee(filepath, token, language) {
  // console.log("body " + req.body);
  return new Promise(async function(resolve, reject) {
    console.log(filepath);
    var verifytoken = await checktoken.checkToken(token);
    console.log(verifytoken);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      await fs.readFile(
        filepath,
        {
          encoding: "utf-8"
        },
        async function(err, csvData) {
          if (err) {
            throw err;
          }
          var linesExceptFirst = csvData
            .split("\n")
            .slice(1)
            .join("\n");
          fs.writeFile(filepath, linesExceptFirst);
          await csvParser(
            linesExceptFirst,
            {
              delimiter: ","
            },
            async function(err, data) {
              if (err) {
                var error = {
                  // statuscode: "E08",
                  status: 500,
                  message: "Something went wrong"
                };
                throw error;
              } else if (data.length != 0) {
                console.log("length", data[0].length);
                for (i = 0; i < data.length; i++) {
                  console.log("data", data[i]);
                  var select_record = await Employee.Employee_select(
                    data[i][4]
                  );
                  data[i][6] = "NO";
                  console.log("select_record", select_record);
                  if (select_record.message.data.length == 0) {
                    console.log(data[i]);
                    var insert_employee = await Employee_profileDao.Employee_insert(
                      data[i]
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
                  status: 200,
                  message:
                    count +
                    " employee records were captured and " +
                    length +
                    " employee records were found to be duplicate."
                });
              } else {
                return resolve({
                  status: 400,
                  message: "Records not found in Employee List.csv File"
                });
              }
            }
          );
          count = 0;
          length = 0;
        }
      );
    }
  });
}

module.exports = {
  uploadbulkemployee: uploadbulkemployee
};
