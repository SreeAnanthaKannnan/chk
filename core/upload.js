var express = require('express');
var multer = require('multer');
var fs = require('fs');
var formidable = require('formidable');
var csvParser = require('csv-parse');
var cm = require('csv-mysql');
const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
var xlsx = require('node-xlsx');
var app = express();

async function upload(filepath, email_id) {
    return new Promise(function(resolve, reject) {
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(filepath);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            for (z in worksheet) {
                if (z[0] === '!') continue;
                //parse out the column, row, and value
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
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
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            console.log(data, "jhkjhkjhkjh");
            var params = []
            var test = params.push(Object.values(data[0]))
            console.log(test);
            var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
            con.query(sql, [params], async function(err, result) {
                console.log(result, "result")

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
};
//===============================================================Code End=============================================================================================//