var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var formidable = require('formidable');
var csvParser = require('csv-parse');
var cm = require('csv-mysql');
const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

var app = express();

function upload(filepath,email_id){    // logger.fatal("body " + req.body);
return new Promise( function (resolve,reject){

logger.fatal(filepath)
   

fs.readFile(filepath, { encoding: 'utf-8' }, function(err, csvData) {

    if (err) 
    {
        logger.fatal(err);
    }


    csvParser(csvData, { delimiter: ',' }, function(err, data) {
        if (err)
        {
            logger.fatal(err);
        } 
        else 
        {      
        logger.fatal(data);    
       // var owner_id=email_id
            var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
            con.query(sql, [data], function(err,result) {
                if(err) { logger.fatal("something",err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })}
                else{
                    
                return resolve({ result});
                }
            });   

        }
    });
});
})
};


module.exports={
    
   upload:upload
 }