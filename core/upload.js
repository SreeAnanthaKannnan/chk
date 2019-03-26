var express = require('express');
var multer = require('multer');
var fs = require('fs');
var formidable = require('formidable');
var csvParser = require('csv-parse');
var cm = require('csv-mysql');
const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
var xlsx = require('node-xlsx');


var app = express();

// async function upload(filepath, email_id) {
//     return new Promise(function(resolve, reject) {
//  /*============================Token Validation========================================*/  
// //    SessionDao.Session_select(token)
// //    .then(async function(result) {
// //        console.log("token-result<======", result);
// //        console.log(result[0], "token");
// //        let query = result
// //        if (query.length == 0) {
// //            resolve({
// //                status: 402,
// //                message: "Invalid token"
// //            });
// //        }
// //        else{
//         logger.fatal(filepath) // logger.fatal("body " + req.body);
//   //========================================Reading .csv file which uploaded from UI.==========================================================//  

//         fs.readFile(filepath, {
//             encoding: 'utf-8'
//         }, function(err, csvData) {

//             if (err) {
//                 logger.fatal(err);
//             }


//             //  csvParser(csvData, {
//             //      delimiter: ','
//             //  }, 
//             xlsx.parse(xlsxFile, {
//                 delimiter: ','
//             }, 
            
//             async function(err, data) {
//                 var params = [];
//                 if (err) {
//                     console.log(err);
//                 } else {
//   //================================Removing the Header from the template which contains the field values============================================================//        
//                     console.log(data.length);
//                     for (var i = 1; i < data.length; i++) {
//                         params.push(data[i])

//                     }
//                     console.log(params);
//  //==================================================storing the csv content into DataBase==============================================================================//
//                     var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
//                     await con.query(sql, [params], async function(err, result) {
//                         if (err) {
//                             return resolve({
//                                 "status": 200,
//                                 "message": 'file uploaded successfully'
//                             })
//                         } else {
//                             return resolve({
//                                 result
//                             });
//                         }
//                     });

//                 }
//             });
//         });
//    // }
// //})
// })
// };
async function upload(filepath, email_id) {
    return new Promise(function(resolve, reject) {
var XLSX = require('xlsx');
var workbook = XLSX.readFile(filepath);
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
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
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log(data,"jhkjhkjhkjh");
    
//  var test= Object.values(data[0])
//    console.log(data,"joieuroiture")
// async function(err, data) {
   var params=[]
//    if (err) {
//                         console.log(err);
//                     } else {
    //   //================================Removing the Header from the template which contains the field values============================================================//        
                        // console.log(data.length);
                        // for (var i = 1; i < data.length; i++) {
                          var test= params.push(Object.values(data[0]))
    
                    //    }
                        console.log(test);
    var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
con.query(sql, [params], async function(err, result) {
    console.log(result,"result")

        if (err) {
            return resolve({
                "status": 200,
                "message": 'file uploaded successfully'
            })
        } else {
            return resolve({
                result
            });
        
        }
    });
   // }
});

    // });

});
    }

module.exports = {

    upload: upload
}
//===============================================================Code End=============================================================================================//