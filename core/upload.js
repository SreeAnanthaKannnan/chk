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

async function upload(filepath,email_id){    // logger.fatal("body " + req.body);
return new Promise( function (resolve,reject){

logger.fatal(filepath)
   

fs.readFile(filepath, { encoding: 'utf-8' }, function(err, csvData) {

    if (err) 
    {
        logger.fatal(err);
    }


    csvParser(csvData, { delimiter: ',' },async function(err, data) {
        var params=[]; 
        if (err)
        {
            console.log(err);
        } 
        else 
        {  
               
        console.log(data.length);  
        for(var i=1;i<data.length;i++){
            params.push(data[i])

        } 
        console.log(params); 
       // var owner_id=email_id
            var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
            await con.query(sql, [params], async function(err,result) {
                if(err) { 
                return resolve({ "status": 200, "message": 'file uploaded successfully' })}
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