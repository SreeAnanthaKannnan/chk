var express = require("express");
var multer = require("multer");
var fs = require("fs");
var formidable = require("formidable");
var csvParser = require("csv-parse");
var cm = require("csv-mysql");
const con = require("../mysql_connection/dbConfig");
var dbFunc = require("../mysql_connection/connection.js");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");

var app = express();

async function upload(filepath, token) {
  return new Promise(function(resolve, reject) {
    /*============================Token Validation========================================*/

    SessionDao.Session_select(token).then(async function(result) {
      console.log("token-result<======", result);
      console.log(result[0], "token");
      let query = result;
      if (query.length == 0) {
        resolve({
          status: 402,
          message: "Invalid token"
        });
      } else {
        logger.fatal(filepath); // logger.fatal("body " + req.body);
        //========================================Reading .csv file which uploaded from UI.==========================================================//

        fs.readFile(
          filepath,
          {
            encoding: "utf-8"
          },
          function(err, csvData) {
            if (err) {
              logger.fatal(err);
            }

            csvParser(
              csvData,
              {
                delimiter: ","
              },
              async function(err, data) {
                var params = [];
                if (err) {
                  console.log(err);
                } else {
                  //================================Removing the Header from the template which contains the field values============================================================//
                  console.log(data.length);
                  for (var i = 1; i < data.length; i++) {
                    params.push(data[i]);
                  }
                  console.log(params);
                  //==================================================storing the csv content into DataBase==============================================================================//
                  var sql =
                    "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
                  await con.query(sql, [params], async function(err, result) {
                    if (err) {
                      return resolve({
                        status: 200,
                        message: "file uploaded successfully"
                      });
                    } else {
                      return resolve({
                        result
                      });
                    }
                  });
                }
              }
            );
          }
        );
      }
    });
  });
}
module.exports = {
  upload: upload
};
//===============================================================Code End=============================================================================================//
