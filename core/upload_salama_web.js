var express = require("express");
var multer = require("multer");

var fs = require('fs');

var formidable = require("formidable");
var csvParser = require("csv-parse");
var cm = require("csv-mysql");
// const con = require("../Mysql_config/DBConfig");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const Employee_profileDao = require("../daos/Employee_profileDao");
const Employee = require("../daos/Employee_profileDao");


var xlsx = require('node-xlsx');
// var app = express();
var count = 0;
var length = 0;
function upload_salama_web(filepath, email_id) {
  // console.log("body " + req.body);
  return new Promise(async function(resolve, reject) {
    console.log(filepath);

    await fs.readFile(filepath, { encoding: "utf-8" }, async function(
      err,
      data
    ) {
      if (err) {
        throw err;
      }
      var XLSX = require('xlsx');
var workbook = XLSX.readFile(filepath);
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(async function(y) {
  var worksheet = workbook.Sheets[y];
  var headers = {};
  var data = [];
  {
    for(z in worksheet) {
      if(z[0] === '!') continue;
      //parse out the column, row, and value
      var tt = 0;
      for (var i = 0; i < z.length; i++) {
          if (!isNaN(z[i])) {
              tt = i;
              break;
          }
      };
      var col = z.substring(0,tt);
      var row = parseInt(z.substring(tt));
      var value = worksheet[z].v;

      //store header names
      if(row == 1 && value) {
          headers[col] = value;
          continue;
      }

      if(!data[row]) data[row]={};
      data[row][headers[col]] = value;
  }
  data.shift();
  data.shift();
  var params=[]

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
            console.log("data", data[i]);
            var select_record = await Employee.Employee_select(data[i].National_Id);
            // data[i].Empty = "NO";
            console.log("select_record", select_record);
            if (select_record.message.data.length == 0) {
              console.log(data[i]);
              var test= (Object.values(data[0]))
              // console.log(params[0][7],"params====>")
              // params[0][7]=params[0][8]
              // console.log(params[0][8],"paramsss [8}")
              //  params[0][8]="NO"
              var insert_employee = await Employee_profileDao.Employee_insert(
                test
          
              );
              
              console.log("insert", insert_employee.message.data.affectedRows);
              // count + 1;
              if (insert_employee.message.data.affectedRows != 0) {
                count++;
                console.log("count numb======>", count);
              }
//               const fs = require('fs');
              
// fs.writeFile("/upload", "/tmp/kPGbwjbRMz98DQyUNgWTrvNY.xlsx", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// });
      

                    var order_Id = "";
                    var possible = "123456789";
                   
                    for (var i = 0; i<6; i++)
                        order_Id += possible.charAt(Math.floor(Math.random() * possible.length));
                    console.log("order_Id" + order_Id);
                  
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
              " employee records were found to be duplicate.",
              order_Id:order_Id
          });
        } else {
          return resolve({
            // statuscode: "E08",
            status: 400,
            message: "Records not found in Employee List.csv File"
          });
        }
      }});
      count = 0;
      length = 0;
    });
  });
}

module.exports = {
  upload_salama_web: upload_salama_web
};
